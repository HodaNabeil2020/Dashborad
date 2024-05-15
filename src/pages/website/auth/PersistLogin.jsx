import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../context/Usecontext";
import { Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import LoadingScreen from "../../../Components/Loading/LoadingScreen";

function PersistLogin() {
  const contextToken = useContext(UserContext);

  const token = contextToken.auth.token;

  const [loading, setLoading] = useState(true);

  const cookie = new Cookies();

  const getToken = cookie.get("Bearer");

  useEffect(() => {
    async function refresh() {
      try {
        await axios
          .post(`http://127.0.0.1:8000/api/refresh`, null, {
            headers: {
              Authorization: "Bearer " + getToken,
            },
          })

          .then((data) => {
            cookie.set("Bearer", data.data.token, { path: "/dashboard/users" });
            contextToken.setAuth((prev) => {
              return { userDetails: data.data.user, token: data.data.token };
            });
          });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    !token ? refresh() : setLoading(false);
  }, []);
  return loading ? <LoadingScreen /> : <Outlet />;
}

export default PersistLogin;
