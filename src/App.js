import Login from "./pages/Login"
// import Home from "./pages/Home";
import Poll from "./pages/Poll";
import { BrowserRouter,Routes,Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Login />} />
           <Route path="poll" element={<Poll />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
