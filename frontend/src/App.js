import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Links from "./Components/Links";
import Preview from "./Components/Preview";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/links/preview/:userId" element={<Preview />} />
          <Route
            path="/yourlinks/addLinks+profiledetails/:userId"
            element={<Links/>}
          />
          <Route path="/" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
