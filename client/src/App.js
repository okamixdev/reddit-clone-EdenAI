import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Auth from "./helpers/auth";
import Home from "./components/Home";
import Create from "./components/Create";
import Profile from "./components/Profile";
import { Login } from "./components/Login";
import Community from "./components/Community";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          {Auth.loggedIn() ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/create" element={<Create />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/community" element={<Community />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<Login />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
