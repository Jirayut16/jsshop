import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <>
      <main className="flex flex-col flex-1">
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
    </>
  );
};
export default MainLayout;
