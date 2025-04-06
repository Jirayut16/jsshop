import { useState, useEffect } from "react";
import liff from "@line/liff";

import { loginLine } from "../../functions/auth";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/userSlice";
import { Bounce, toast } from "react-toastify";

const Line = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: "2006814992-QgWejGJn" });
        if (liff.isLoggedIn()) {
          await handleLogin();
        }
      } catch (err) {
        console.log(err);
      }
    };
    initLiff();
  }, []);

  const handleLogin = async () => {
    try {
      const profile = await liff.getProfile();
      const idToken = liff.getIDToken();
      console.log("lineliff", profile, idToken);
      await loginLine(profile)
        .then((res) => {
          console.log(res);
          setLoading(false);
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
            login({
              name: res.data.payload.user.user,
              role: res.data.payload.user.role,
              token: res.data.token,
            })
          );
          localStorage.setItem("token", res.data.token);
          //เรียกใช้ roleRedirect ตรงนี้
          roleRedirect(res.data.payload.user.role);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const roleRedirect = (role: string | null) => {
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }
  };

  return loading ? <h1>loading...</h1> : null;
};
export default Line;
