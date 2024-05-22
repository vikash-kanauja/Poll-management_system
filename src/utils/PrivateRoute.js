import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ADMIN_ID } from "./constantValue";
const PrivateRoute = ({ Component,redirectTo }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const user = JSON.parse(localStorage.getItem("user"));

    if (token) {
      if (redirectTo === "/signup" || redirectTo === "/") {
        navigate("/polling");
      } else if (user.roleId !== ADMIN_ID) {
        navigate("/polling"); 
      }
    } else {
      navigate(redirectTo === "/signup" ? "/signup" : "/");
    }
  }, [navigate, redirectTo]);
  return <Component />;
}
  export default PrivateRoute;

