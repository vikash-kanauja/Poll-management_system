import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import axiosInterceptor from './utils/axiosInterceptor';

import Login from "./pages/Login";
import Poll from "./pages/Poll";
import PageNotFound from "./pages/PageNotFound"
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import  Navbar  from "./Components/Navbar";


function App() {
  const u = useSelector(state => state.auth.user) 
  axiosInterceptor();
  return (
    <div className="App">
      {u && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute Component={Login} redirectTo="/" />}
        />
        <Route
          path="/poll"
          element={<PrivateRoute Component={Poll} redirectTo="/poll" />}
        />
        <Route
          path="/signup"
          element={<PrivateRoute Component={Signup} redirectTo="/signup" />}
        />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
