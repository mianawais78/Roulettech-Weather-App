import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { FaUserAlt } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { config } from "../Config";
function LoginForm({ handleLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare the request body
    const requestBody = {
      username: username,
      password: password,
    };

    // Make the login request and retrieve the JWT token
    fetch(`${config.apiBaseUrl}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log(response);
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        if (data.access) {
          handleLogin(data.access); // Store the access token
          navigate("/home");
        } else {
          throw new Error("Invalid JWT token");
        }
      })
      .catch((error) => {
        console.log("Login failed:", error);
      });
  };
  return (
    <div className="wrapper">
      <form action="" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUserAlt className="icon" />
        </div>
        <div className="input-box">
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#">Forgot password?</a>
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          <p>
            Don't have an account?<a href="#">Register</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
