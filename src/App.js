import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import axiosInterceptor from './utils/axiosInterceptor';
import Login from "./pages/Login";
import Poll from "./pages/Poll";
import Users from "./pages/Users";
import PageNotFound from "./pages/PageNotFound"
import Signup from "./pages/Signup";
import Navbar from "./Components/Navbar";
import AddPoll from "./pages/AddPoll";
import CreateUser from "./Components/CreateUser";
import EditPollList from "./pages/EditPollList";

function App() {

  axiosInterceptor();
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<PrivateRoute Component={Login} redirectTo="/" />}
        />
        <Route
          path="/polling"
          element={<PrivateRoute Component={Poll} redirectTo="/polling" />}
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
          element={<PrivateRoute Component={CreateUser} redirectTo="/createUser" />}
        />
        <Route
          path="/users"
          element={<PrivateRoute Component={Users} redirectTo="/users" />}
        />
        <Route
          path="/editPoll/:id"
          element={
            <PrivateRoute Component={EditPollList} redirectTo="/editPoll" />
          }
        />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
