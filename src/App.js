import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import axiosInterceptor from './utils/axiosInterceptor';
import Login from "./pages/Login";
import Poll from "./pages/Poll";
import Users from "./pages/Users";
import PageNotFound from "./pages/PageNotFound"
import Signup from "./pages/Signup";
import  Navbar  from "./Components/Navbar";
import AddPoll from "./pages/AddPoll";
import { useSelector } from "react-redux";

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
        <Route
          path="/addpoll"
          element={<PrivateRoute Component={AddPoll} redirectTo="/addpoll" />}
        />
        <Route
          path="/createUser"
          element={<PrivateRoute Component={Signup} redirectTo="/createUser" />}
        />

        <Route
          path="/users"
          element={<PrivateRoute Component={Users} redirectTo="/users" />}
        />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
