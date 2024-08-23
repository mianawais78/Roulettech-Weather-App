import "./App.css";
import LoginForm from "./Components/Login/LoginForm";
import Home from "./Components/Home/Home";
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./store/actions/authActions"; 

function App() {
  const token = useSelector((state) => state.auth.token);
  const username = useSelector((state) => state.auth.username);
  const dispatch = useDispatch();

  useEffect(() => {
    
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");

    if (storedToken && storedUsername) {
      
      dispatch(login(storedToken, storedUsername));
    }
  }, [dispatch]);

  const handleLogin = (jwtToken, username) => {
    dispatch(login(jwtToken, username));
    localStorage.setItem("token", jwtToken);
    localStorage.setItem("username", username); 
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    localStorage.removeItem("username"); 
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
                <Home
                  token={token}
                  handleLogout={handleLogout}
                  username={username}
                />
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
