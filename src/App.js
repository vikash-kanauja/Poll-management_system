import { Route, Routes, BrowserRouter, Redirect,Navigate } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import Login from "./pages/Login";
import Poll from "./pages/Poll";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
              <Route element={<Poll/>} path="/poll" exact />
          </Route>
          <Route element={<Login/>} path="/" />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
