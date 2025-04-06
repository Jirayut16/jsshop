import express from "express";
import { readdirSync } from "fs";
import morgan from "morgan";
import core from "cors";
import bodyParser from "body-parser";
import connectDB from "./Config/db.js";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    //connect database
    await connectDB();

    //middleware
    app.use(morgan("dev"));
    app.use(core());
    app.use(bodyParser.json({ limit: "10mb" }));
    app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
    app.use("/uploads", express.static("uploads"));

    //routes
    readdirSync("./Routes").map((r) => {
      import(`./Routes/${r}`).then((route) => {
        app.use("/api", route.default); //
      });
    });

    //start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", err);
  }
};

startServer();

export default app;
