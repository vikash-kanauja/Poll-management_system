import { Route, Routes } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./pages/Login";
import Poll from "./pages/Poll";
import Signup from "./pages/Signup";

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
        <Route
          path="/signup"
          element={<PrivateRoute Component={Signup} redirectTo="/signup" />}
        />
      </Routes>
    </div>
  );
}

export default App;
