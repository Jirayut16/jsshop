import { login, loginFacebook } from "../../functions/auth";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login as loginRedux } from "../../store/userSlice";

//line liff login
import liff from "@line/liff";
import { useEffect, useState } from "react";

//icon
import { MdOutlineLogin } from "react-icons/md";
import { FaLine, FaSpinner } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";

//facebook login
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

//toastify
import { Bounce, toast } from "react-toastify";
import { Divider } from "antd";
import FloatLabelInput from "../../components/FloatLabelInput";
import { ButtonLoading, ButtonPrimary } from "../../components/Button";

import { getRandomPhotos } from "../../functions/picture";
import { IoArrowBackCircleSharp } from "react-icons/io5";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //random img
  const [photo, setPhoto] = useState<undefined | string>("");

  //setup liff
  useEffect(() => {
    liff.init({ liffId: "2006814992-QgWejGJn" });
  }, []);

  const handleLoginLine = () => {
    try {
      liff.login();
    } catch (err) {
      console.log(err);
    }
  };
  //end setup liff

  //loading
  const [loading, setLoading] = useState(false);
  const loadingButton = () => {
    return new Promise((resolve) => setTimeout(resolve, 3000));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    loadingButton().then(() => setLoading(false));
    const data = new FormData(event.currentTarget);
    console.log(data);

    const tam = {
      name: data.get("name"),
      password: data.get("password"),
    };

    login(tam)
      .then((res) => {
        console.log(res);
        toast.success(`User  ${res.data.payload.user.user}  login success !!`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        //dispath ข้อมูล
        dispatch(
          loginRedux({
            name: res.data.payload.user.user,
            role: res.data.payload.user.role,
            token: res.data.token,
          })
        );
        localStorage.setItem("token", res.data.token);
        //เรียกใช้ roleRedirect ตรงนี้
        roleRedirect(res.data.payload.user.role);
      })
      .catch((err) =>
        toast.error(err.response.data.error, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        })
      );
  };

  const location = useLocation();
  const fromPage = location.state?.from || "/"; // ถ้าไม่มีให้กลับไปหน้าแรก

  const roleRedirect = (role: string) => {
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
      navigate(fromPage, { replace: true });
    }
  };

  const responseFacebook = async (response: any) => {
    console.log("res login fb", response);
    await loginFacebook(response)
      .then((res) => {
        toast.success(
          `User  ${res.data.payload.user.displayName}  login success !!`,
          {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          }
        );
        dispatch(
          loginRedux({
            name: res.data.payload.user.user,
            role: res.data.payload.user.role,
            token: res.data.token,
          })
        );
        localStorage.setItem("token", res.data.token);
        //เรียกใช้ roleRedirect ตรงนี้
        roleRedirect(res.data.payload.user.role);
        if (response.status === "unknown") {
          redirect("/login");
        } else {
          roleRedirect(res.data.payload.user.role);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const random = Math.floor(Math.random() * 50);
    getRandomPhotos().then((res) => {
      if (res) {
        setPhoto(res.data.hits[random].largeImageURL.toString());
      }
    });
  }, []);

  return (
    <>
      {/* login */}
      <div className="flex flex-col xl:flex-row h-screen">
        {/* Random pic */}
        <div className="w-1/2 hidden xl:block ">
          <div className="w-full h-full relative">
            <button className="absolute left-10 top-10">
              <Link to={"/"}>
                <IoArrowBackCircleSharp className="text-4xl text-light hover:scale-105" />
              </Link>
            </button>
            <img src={photo} alt="" className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Login section */}

        <div className="w-full h-full xl:w-1/2 flex  justify-center items-center p-0 xl:p-8 bg-stone-100 dark:bg-background-dark ">
          <div className="p-8 w-full xl:w-3/4 h-full flex flex-col items-center justify-center bg-white dark:bg-background rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-col justify-center items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img
                    src="../../../public/account-security.svg"
                    alt="login"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-3xl font-semibold text-center">Login</h1>
                <p className="text-md mt-4">
                  Please enter your username and password.
                </p>
              </div>
              <FloatLabelInput
                label={"Username"}
                type={"text"}
                id={"name"}
                required
                name={"name"}
              ></FloatLabelInput>
              <FloatLabelInput
                label={"Password"}
                type={"password"}
                id={"password"}
                required
                name={"password"}
              ></FloatLabelInput>

              {loading ? (
                <ButtonLoading type="submit">
                  <span className="flex flex-row items-center justify-center gap-2">
                    <FaSpinner className="text-2xl animate-spin" />
                    Login...
                  </span>
                </ButtonLoading>
              ) : (
                <ButtonPrimary type={"submit"}>
                  <span className="flex flex-row items-center justify-center gap-2">
                    <MdOutlineLogin className="text-2xl" />
                    Login
                  </span>
                </ButtonPrimary>
              )}
            </form>

            <Divider style={{ borderColor: "#D1D5DB" }}>OR</Divider>

            <button
              type="submit"
              onClick={handleLoginLine}
              className=" bg-green-500 text-white w-full rounded-md py-1 text-md font-semibold cursor-pointer hover:bg-green-600 transition duration-300 ease-in-out"
            >
              <span className="flex flex-row items-center justify-center gap-2">
                <FaLine className="text-3xl" />
                Login With Line
              </span>
            </button>
            <FacebookLogin
              appId="9820227978006140"
              autoLoad={false}
              fields="name,email,picture"
              callback={responseFacebook}
              render={(renderProps: any) => (
                <button
                  type="submit"
                  onClick={renderProps.onClick}
                  className="mt-2 bg-blue-500 text-white w-full rounded-md py-1  text-md font-semibold cursor-pointer hover:bg-blue-600 transition duration-300 ease-in-out"
                >
                  <span className="flex flex-row items-center justify-center gap-2">
                    <FaFacebookSquare className="text-3xl" />
                    Login With Facebook
                  </span>
                </button>
              )}
            />
            <div className="mt-4 flex flex-row justify-center gap-1">
              <p className="text-md font-semibold text-gray-500">
                Don't have an account?
              </p>
              <Link to="/register" className="text-red-500">
                <span className="underline text-blue-500 hover:text-blue-700 hover:font-semibold">
                  Register
                </span>
              </Link>
            </div>
            <div>
              <p className="mt-4 text-sm text-gray-500">
                copyright &copy;{new Date().getFullYear()}
              </p>
              <Link to={"/"}>
                <p className="mt-4 text-sm text-blue-500 underline text-center block xl:hidden">
                  Back to Home
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
