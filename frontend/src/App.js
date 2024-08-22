import "./App.css";
import LoginForm from "./Components/Login/LoginForm";
import Home from "./Components/Home/Home";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLogin = (jwtToken) => {
    setToken(jwtToken);
    localStorage.setItem("token", jwtToken);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <Navigate to="/home" />
              ) : (
                <LoginForm handleLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/home"
            element={
              token ? (
                <Home token={token} handleLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
