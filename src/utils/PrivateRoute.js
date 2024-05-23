import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ADMIN_ID } from "./constantValue";

const ProtectedRoute = ({ Component, redirectTo, isAdminRoute, publicRoute }) => {
  const navigate = useNavigate();
  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!publicRoute && !token) {
      navigate('/');
    }
    if (publicRoute && token) {
      navigate(redirectTo);
    }
  }, [publicRoute, token, navigate, redirectTo]);

  if (publicRoute) {
    return token ? <Navigate to={redirectTo} /> : <Component />;
  }

  if (!token) {
    return <Navigate to="/" />;
  }

  if (isAdminRoute && user.roleId !== ADMIN_ID) {
    return <Navigate to={redirectTo} />;
  }

  return <Component />;
};

export default ProtectedRoute;
