import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { currentAdmin } from "../functions/auth";
import NotFound from "../pages/NotFound";
import { RootState } from "../store/store";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.user);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    if (user && user.user.token) {
      currentAdmin(user.user.token)
        .then((res) => {
          console.log(res);
          setOk(true);
        })
        .catch((err) => {
          console.log(err);
          setOk(false);
        });
    }
  }, [user]);

  return ok ? <div className="app">{children}</div> : <NotFound />;
};
export default AdminRoute;
