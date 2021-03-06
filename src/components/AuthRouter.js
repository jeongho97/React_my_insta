import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../store/UserContext";

const AuthRouter = () => {
  const { users } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const id = localStorage.getItem("id");
    const findUser = users.find((data) => data.id === Number(id));

    if (!findUser || !id) {
      const from =
        location.pathname === "/login" || location.pathname === "/join"
          ? location.pathname
          : "/login";
      navigate(from);
    } else {
      const from = location.pathname || "/";
      navigate(from === "/login" || from === "/join" ? "/" : from);
    }
  }, []);
  return <></>;
};

export default AuthRouter;
