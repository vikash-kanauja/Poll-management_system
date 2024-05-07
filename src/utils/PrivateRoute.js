import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = ({ children, ...rest }) => {
  const auth = localStorage.getItem('token');
  return (
   auth ? <Outlet/> : <Navigate to = "/"/>
     
  );
};

export default PrivateRoute;


