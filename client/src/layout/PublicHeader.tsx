import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../store/userSlice";
import { AppDispatch, RootState } from "../store/store";
import { useEffect, useState } from "react";
import { GrClose } from "react-icons/gr";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { BsCart4 } from "react-icons/bs";
import { RiAdminLine } from "react-icons/ri";
import { Tooltip } from "antd";
import { getUserIdFromToken } from "../utils/userIdDecode";
import { fetchCart } from "../store/cartSlice";
import Dropdown from "../components/Dropdown";
import ThemeToggle from "../components/ThemeToggle";
import {
  DashboardOutlined,
  HistoryOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from "@ant-design/icons";

const PublicHeader = ({ classname }: { classname: string }) => {
  const user = useSelector((state: RootState) => state.user);
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch<AppDispatch>();

  const userId = getUserIdFromToken();
  useEffect(() => {
    dispatch(fetchCart({ userId: userId ?? "" }));
  }, [dispatch, userId, cart?.items?.length]);

  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const [state, setState] = useState(false);
  const navigation = [
    { title: "Home", to: "/" },
    { title: "All Product", to: "/allproduct" },
    { title: "Contact", to: "/contact" },
    { title: "About", to: "/about" },
  ];

  return (
    <nav className={classname}>
      <div className="items-center container mx-auto md:flex px-4 md:px-0 ">
        {/* 1 */}
        <div className="flex items-center justify-between py-0.5 md:py-0 md:block">
          {/* logo */}
          <Link to={"/"}>
            <div className="w-24 h-12 md:w-36 md:h-16 flex justify-center items-center rounded-md ">
              <img
                src="/logo3.webp"
                alt="logo"
                className="h-full object-cover"
              />
            </div>
          </Link>

          <div className="flex flex-row gap-6 p-2 justify-center items-center md:hidden ">
            {/* Mode Mobile */}
            <div className="md:hidden flex flex-row justify-center items-center">
              <ThemeToggle />
            </div>
            {/* Admin Mobile */}
            {user.user.role === "admin" && (
              <>
                <div className="md:hidden flex justify-center items-center">
                  <Link to={"/admin/dashboard"}>
                    <Tooltip title={"Admin"}>
                      <RiAdminLine className="text-2xl" />
                    </Tooltip>
                  </Link>
                </div>
              </>
            )}
            {/* User Mobile */}
            {user.user.role === "user" && (
              <>
                <div className="relative md:hidden flex justify-center items-center">
                  <Link to={"/mycart"}>
                    <Tooltip title={"Cart"}>
                      <BsCart4 className="text-2xl" />
                    </Tooltip>
                  </Link>
                  <span className="md:hidden absolute bottom-2 left-2 text-md text-white bg-button rounded-full w-5 h-5 flex justify-center items-center">
                    {cart?.items?.length.toString()}
                  </span>
                </div>
              </>
            )}

            {/* hamburger */}
            <div className="md:hidden flex justify-center items-center">
              <button
                className="text-accent-dark text-2xl"
                onClick={() => setState(!state)}
              >
                {state ? <GrClose /> : <RxHamburgerMenu />}
              </button>
            </div>
          </div>
        </div>
        {/* 2 */}
        <div
          className={`flex-1 justify-self-center pb-3 mt-2 md:block md:pb-0 md:mt-0  w-full ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-center items-center space-y-4 md:flex-row flex-col flex md:space-x-8 lg:space-x-16 md:space-y-0 bg-white dark:bg-background-dark rounded-md py-2 md:py-0 dark:md:bg-transparent md:bg-transparent">
            {navigation.map((item, idx) => {
              return (
                <li key={idx} className="relative group">
                  <NavLink
                    key={idx}
                    to={item.to}
                    end
                    className={({ isActive }) =>
                      isActive
                        ? ` text-lg lg:text-xl font-medium transition-all duration-300 ease-in-out cursor-pointer`
                        : ` text-base lg:text-xl font-light transition-all duration-300 ease-in-out cursor-pointer`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {item.title}
                        {isActive ? (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"></span>
                        ) : (
                          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-button group-hover:w-full group-hover:left-0 transition-all duration-300 ease-in-out"></span>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
            {user.user.role === "user" && (
              <>
                <hr className="border border-gray-300 w-5/6 md:hidden" />
                <div className="md:hidden text-lg w-full flex flex-col justify-center items-center gap-2">
                  <Link to={"/myprofile"}>
                    <li>
                      <ProfileOutlined className="me-2" />
                      My Profile
                    </li>
                  </Link>
                  <Link to={"/my-orders"}>
                    <li>
                      <HistoryOutlined className="me-2" />
                      My Orders
                    </li>
                  </Link>
                  <li
                    onClick={handleLogout}
                    className=" bg-button text-white dark:text-text-dark hover:bg-red-500 rounded-md w-5/6 text-center p-1 mb-2"
                  >
                    <LogoutOutlined className="me-2" />
                    Logout
                  </li>
                </div>
              </>
            )}
            {user.user.role === "admin" && (
              <>
                <hr className="border border-gray-300 w-5/6 md:hidden" />
                <div className="md:hidden text-lg w-full flex flex-col justify-center items-center gap-2">
                  <Link to={"/admin/dashboard"}>
                    <li className="text-lg md:hidden">
                      <DashboardOutlined className="me-2 " />
                      Dashboard
                    </li>
                  </Link>
                  <li
                    onClick={handleLogout}
                    className=" bg-button text-white dark:text-text-dark hover:bg-red-500 rounded-md w-5/6 text-center p-1 mb-2"
                  >
                    <LogoutOutlined className="me-2" />
                    Logout
                  </li>
                </div>
              </>
            )}
          </ul>
        </div>
        {/* 3  */}
        <div className={` md:flex  ${state ? "flex" : "hidden"}`}>
          <div className="flex flex-col md:flex-row gap-8 w-full">
            <div className="hidden md:flex flex-row justify-center items-center">
              <ThemeToggle />
            </div>
            {/* ถ้า ไม่ได้ login */}
            <div className="flex flex-col md:flex-row justify-center md:items-center gap-2 md:gap-4 w-full  rounded-md md:bg-transparent p-2 md:p-0 mb-2 md:mb-0">
              {user.user.name === "" && (
                <>
                  <Link to={"/register"}>
                    <button className="text-text bg-white hover:bg-stone-200 w-full rounded-sm md:shadow-md px-4 py-1 md:py-0.5 text-lg font-normal transition-all duration-300 ease-in-out cursor-pointer">
                      Register
                    </button>
                  </Link>

                  <Link to={"/login"}>
                    <button className="text-light bg-button hover:bg-red-500 w-full rounded-sm md:shadow-md px-4 py-1 md:py-0.5 text-lg font-normal transition-all duration-300 ease-in-out cursor-pointer">
                      Login
                    </button>
                  </Link>
                </>
              )}
              {/* ถ้า login เป็น admin */}
              {user.user.name && user.user.role === "admin" && (
                <div className="hidden md:flex flex-row justify-center items-center gap-0 md:gap-4 ">
                  <Link to={"/admin/dashboard"}>
                    <DashboardOutlined className="text-2xl hidden md:block cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out" />
                  </Link>
                  <span className="text-4xl font-extralight:text-white cursor-default hidden md:block">
                    |
                  </span>
                  <button
                    className="text-light bg-button hover:bg-red-500 w-full rounded-md md:shadow-md px-2 py-1 md:py-0.5 text-lg font-normal transition-all duration-300 ease-in-out cursor-pointer"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
              {/* ถ้า login เป็น user */}
              {user.user.name && user.user.role === "user" && (
                <div className="flex flex-row justify-center items-center gap-0 md:gap-6">
                  <div onClick={() => navigate("/mycart")} className="relative">
                    <BsCart4 className="text-2xl hidden md:block cursor-pointer hover:text-button hover:scale-105 transition-all duration-300 ease-in-out"></BsCart4>
                    <span className="hidden md:flex absolute bottom-3 left-4 text-md text-white bg-button rounded-full w-6 h-6  justify-center items-center cursor-pointer">
                      {cart?.items?.length > 0
                        ? cart?.items?.length.toString()
                        : 0}
                    </span>
                  </div>
                  <span className="text-4xl font-extralight text-white cursor-default hidden md:block">
                    |
                  </span>
                  <div className="hidden md:block">
                    <Dropdown />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default PublicHeader;
