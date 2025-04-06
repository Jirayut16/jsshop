import { useEffect, useState } from "react";
import FloatLabelInput from "../../components/FloatLabelInput";
import { register } from "../../functions/auth";

// toastify
import { Bounce, toast } from "react-toastify";
import {
  ButtonLoadingSecondary,
  ButtonSecondary,
} from "../../components/Button";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { getRandomPhotos } from "../../functions/picture";
import { FiUserPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { IoArrowBackCircleSharp } from "react-icons/io5";

export default function Register() {
  //random img
  const [photo, setPhoto] = useState<undefined | string>("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const loadingButton = () => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  };
  const navigateTologin = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(navigate("/login"));
      }, 3000);
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    loadingButton().then(() => setLoading(false));
    const data = new FormData(event.currentTarget);

    const registerData = {
      name: data.get("name"),
      password: data.get("password"),
      confirmPassword: data.get("confirmPassword"),
    };

    console.log("registerData", registerData);

    register(registerData)
      .then((res) => {
        console.log(res);
        // alert(res.data);
        toast.success(res.data, {
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
        if (res) {
          navigateTologin();
        } else {
          navigate("/register");
        }
      })
      .catch((err) => {
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
        });
      });
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
      <div className="flex flex-col xl:flex-row h-screen">
        <div className="w-1/2 hidden xl:block">
          <div className="w-full h-full relative">
            <button className="absolute left-10 top-10">
              <Link to={"/"}>
                <IoArrowBackCircleSharp className="text-4xl text-light hover:scale-105" />
              </Link>
            </button>
            <img src={photo} alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="w-full h-full xl:w-1/2 flex  justify-center items-center p-0 xl:p-8 bg-stone-100 dark:bg-background-dark ">
          <div className="p-8 w-full xl:w-3/4 h-full flex flex-col items-center justify-center bg-white dark:bg-background rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="w-full">
              <div className="flex flex-col justify-center items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img
                    src="../../../public/user.svg"
                    alt="login"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-3xl font-semibold text-center mt-2">
                  Register Form
                </h1>
                <p className="text-md mt-4">
                  Please enter your username and password.
                </p>
              </div>
              <div className="mt-4">
                <FloatLabelInput
                  label={"Username"}
                  type={"text"}
                  id={"name"}
                  required
                  name={"name"}
                ></FloatLabelInput>
                <p className="text-xs ms-4 mt-1 font-light text-red-500">
                  At least 3 characters
                </p>
              </div>
              <div className="mt-4">
                <FloatLabelInput
                  label={"Password"}
                  type={"password"}
                  id={"password"}
                  required
                  name={"password"}
                ></FloatLabelInput>
                <p className="text-xs ms-4 mt-1 font-light text-red-500">
                  At least 4 characters
                </p>
              </div>
              <div className="mt-4">
                <FloatLabelInput
                  label={"Confirm Password"}
                  type={"password"}
                  id={"confirmPassword"}
                  required
                  name={"confirmPassword"}
                ></FloatLabelInput>
                <p className="text-xs ms-4 mt-1 font-light text-red-500">
                  At least 4 characters
                </p>
              </div>
              {loading ? (
                <div className="mt-4">
                  <ButtonLoadingSecondary type="submit">
                    <span className="flex flex-row items-center justify-center gap-2 ">
                      <FaSpinner className="text-2xl animate-spin" />
                      Register...
                    </span>
                  </ButtonLoadingSecondary>
                </div>
              ) : (
                <div className="mt-4">
                  <ButtonSecondary type={"submit"}>
                    <span className="flex flex-row items-center justify-center gap-2">
                      <FiUserPlus className="text-2xl" />
                      Register
                    </span>
                  </ButtonSecondary>
                </div>
              )}
            </form>

            <div className="mt-4 flex flex-row justify-center gap-1">
              <p className="text-md font-semibold text-gray-500">
                Already have an account
              </p>
              <Link to="/login" className="text-red-500">
                <span className="underline text-blue-500 hover:text-blue-700 hover:font-semibold">
                  Login
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
