import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/PrivateRoute";
import axiosInterceptor from './utils/axiosInterceptor';
import Login from "./pages/Login";
import Poll from "./pages/Poll";
import UserList from "./pages/UserList";
import PageNotFound from "./pages/PageNotFound";
import UserSignupRegister from "./pages/UserSignupRegister";
import Navbar from "./Components/Navbar";
import AddEditPollPage from "./pages/AddEditPollPage";

function App() {
  axiosInterceptor();
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute Component={Login} redirectTo="/polling" publicRoute={true} />} />
        <Route path="/signup" element={<ProtectedRoute Component={UserSignupRegister} redirectTo="/polling" publicRoute={true} />} />
        <Route path="/polling" element={<ProtectedRoute Component={Poll} redirectTo="/polling" />} />
        <Route path="/addPoll" element={<ProtectedRoute isAdminRoute={true} Component={AddEditPollPage} redirectTo="/polling" />} />
        <Route path="/editPoll/:id" element={<ProtectedRoute isAdminRoute={true} Component={AddEditPollPage} redirectTo="/polling" />} />
        <Route path="/createUser" element={<ProtectedRoute isAdminRoute={true} Component={UserSignupRegister} redirectTo="/polling" />} />
        <Route path="/users" element={<ProtectedRoute isAdminRoute={true} Component={UserList} redirectTo="/polling" />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
