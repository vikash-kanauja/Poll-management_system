import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./pages/Login";
import Poll from "./pages/Poll";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute Component={Login} redirectTo="/" />}
        />
        <Route
          path="/poll"
          element={<PrivateRoute Component={Poll} redirectTo="/poll" />}
        />
      </Routes>
    </div>
  );
}

export default App;

// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// const PrivateRoute = ({ Component, redirectTo }) => {
//   const navigate = useNavigate();
//   useEffect(() => {
//     const token = JSON.parse(localStorage.getItem("token"));
//     if (token) {
//       if (redirectTo === "/signup" || redirectTo === "/") {
//         navigate("/polling");
//       }
//     } else {
//       navigate(redirectTo === "/signup" ? "/signup" : "/");
//     }
//   }, [navigate, redirectTo]);
//   return <Component />;
// };
// export default PrivateRoute;