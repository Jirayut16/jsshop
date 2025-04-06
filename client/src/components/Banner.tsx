import { FaUserPlus } from "react-icons/fa";
import { IoBagHandleSharp } from "react-icons/io5";
import PublicHeader from "../layout/PublicHeader";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="w-screen h-screen overflow-hidden ">
      <div className="w-full h-full relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/banner.jpg')] bg-cover bg-center bg-no-repeat z-10 animate__animated animate__fadeInDown animate__slow " />
        <div className="absolute inset-0 bg-black/30 dark:bg-black/40 z-10 transition-all duration-500 ease-in-out " />

        {/* Header */}
        <div className="relative z-20">
          <PublicHeader classname="bg-soft-dark/20 dark:bg-soft-dark md:dark:bg-soft-dark/20 text-black md:text-white dark:text-text-dark md:bg-transparent w-full md:static"></PublicHeader>
        </div>

        <div className="relative z-20 w-full h-full flex flex-col justify-center items-center lg:flex-row gap-2 ">
          <div className="flex flex-col w-full lg:w-1/2 h-full mt-16 md:mt-0 text-light justify-center items-center gap-8 animate__animated animate__fadeInLeftBig animate__slow">
            <h1 className="text-[33px]  sm:text-5xl tracking-wide font-bold ">
              Welcome To JSSHOP
            </h1>
            <div className="hidden lg:flex flex-col gap-8 justify-center items-center text-2xl tracking-wide font-light">
              <p>STEP INTO STYLE –</p>
              <p>DISCOVER TRENDY FASHION</p>
              <p>THAT DEFINE YOU</p>
            </div>
            <div className="flex flex-col lg:hidden gap-2 justify-center items-center text-xl sm:text-3xl md:text-3xl tracking-wide font-light">
              <p>STEP INTO STYLE –</p>
              <p>DISCOVER TRENDY FASHION</p>
              <p>THAT DEFINE YOU</p>
            </div>

            <div className="flex flex-col items-center justify-center gap-6 lg:hidden">
              <Link to={"/register"}>
                <button className="flex flex-row items-center justify-center gap-2 w-48 bg-white dark:bg-accent-dark px-4 py-2 text-xl font-light cursor-pointer text-text dark:text-text-dark hover:bg-text hover:text-light dark:hover:bg-accent rounded-sm transition duration-300 ease-in-out">
                  Signup First
                  <FaUserPlus size={30} />
                </button>
              </Link>

              <Link to={"/allproduct"}>
                <button className="flex flex-row items-center justify-center gap-2 w-48 bg-primary shadow-lg text-white px-4 py-2 text-xl font-light cursor-pointer hover:bg-main hover:text-light rounded-sm transition duration-300 ease-in-out">
                  Shop now
                  <IoBagHandleSharp size={30} />
                </button>
              </Link>
            </div>

            <Link to={"/register"}>
              <button className="hidden lg:flex flex-row items-center justify-center gap-2 bg-white dark:bg-accent-dark px-4 py-2 text-xl font-light cursor-pointer text-text dark:text-text-dark hover:bg-text hover:text-light dark:hover:bg-accent rounded-sm transition duration-300 ease-in-out">
                Signup First
                <FaUserPlus size={30} />
              </button>
            </Link>
          </div>
          <div className="hidden lg:flex flex-col h-full gap-8 justify-center items-center w-1/2 bg-clip-text text-transparent bg-gradient-to-r from-[#cd3628] to-[#35120f] font-bold animate__animated animate__fadeInRightBig animate__slow">
            <p className="text-5xl me-44 font-bold">YOUR STYLE,</p>
            <p className="text-6xl ms-16 me-48 font-bold">YOUR</p>
            <p className="text-7xl ms-16 me-54 font-bold">WAY</p>
            <Link to={"/allproduct"}>
              <button className="flex flex-row items-center justify-center gap-2 me-48 bg-primary shadow-lg text-white px-4 py-2 text-xl font-light cursor-pointer hover:bg-main hover:text-light rounded-sm transition duration-300 ease-in-out">
                Shop now
                <IoBagHandleSharp size={30} />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
