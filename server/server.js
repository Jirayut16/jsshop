import express from "express";
import morgan from "morgan";
import core from "cors";
import connectDB from "./Config/db.js";
import "dotenv/config";
import { readdir } from "fs/promises";

const app = express();
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    //connect database
    await connectDB();

    //middleware
    app.use(morgan("dev"));
    app.use(core());
    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    //routes
    const routes = await readdir("./Routes");
    await Promise.all(
      routes.map(async (r) => {
        const route = await import(`./Routes/${r}`);
        app.use("/api", route.default);
      })
    );

    //start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
  }
};

startServer();

export default app;
