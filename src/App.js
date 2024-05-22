import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import axiosInterceptor from './utils/axiosInterceptor';
import Login from "./pages/Login";
import Poll from "./pages/Poll";
import UserList from "./pages/UserList";
import PageNotFound from "./pages/PageNotFound"
import UserSignupRegister from "./pages/UserSignupRegister";
import Navbar from "./Components/Navbar";
import AddEditPollPage from "./pages/AddEditPollPage";

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
          element={<PrivateRoute Component={UserSignupRegister} redirectTo="/signup" />}
        />
        <Route
          path="/addPoll"
          element={
            <PrivateRoute Component={AddEditPollPage} redirectTo="/addPoll" />}
        />
        <Route
          path="/editPoll/:id"
          element={<PrivateRoute Component={AddEditPollPage} redirectTo="/editpoll" />}
        />
        <Route
          path="/createUser"
          element={<PrivateRoute Component={UserSignupRegister} redirectTo="/createUser" />}
        />
        <Route
          path="/users"
          element={<PrivateRoute Component={UserList} redirectTo="/users" />}
        />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
