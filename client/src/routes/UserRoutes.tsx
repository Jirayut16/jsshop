//ดึง token ออกมาจาก redux store
import { useSelector } from "react-redux";
import NotFound from "../pages/NotFound";
import { Outlet } from "react-router-dom";
import { RootState } from "../store/store";

const UserRoutes = () => {
  const user = useSelector((state: RootState) => state.user);
  console.log("userRoute", user);

  //check ถ้าไม่ได้ login ให้ไป login

  return user && user.user.token ? (
    <>
      <Outlet />
    </>
  ) : (
    <NotFound />
  );
};
export default UserRoutes;
