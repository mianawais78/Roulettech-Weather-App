import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";
import { FaUserAlt } from "react-icons/fa";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { config } from "../Config";

function LoginForm({ handleLogin, handleUsername }) {
  const [formState, setformState] = useState("Login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Prepare the request body
    const requestBody = {
      username: username,
      password: password,
      ...(formState === "Sign Up" && { email: email }), // Add email only if formState is Sign Up
    };

    const endpoint = formState === "Login" ? "/login/" : "/register/"; // Set endpoint based on formState

    // Make the request and retrieve the JWT token or handle signup
    fetch(`${config.apiBaseUrl}${endpoint}`, {
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
          throw new Error(`${formState} failed`);
        }
      })
      .then((data) => {
        if (formState === "Login") {
          if (data.access) {
            handleLogin(data.access);
            handleUsername(data.username);
            navigate("/home");
          } else {
            throw new Error("Invalid JWT token");
          }
        } else {
          // Handle signup success
          alert("Signup successful! Please log in.");
          setformState("Login");
        }
      })
      .catch((error) => {
        console.log(`${formState} failed:`, error);
      });
  };

  return (
    <div className="wrapper">
      <form action="" onSubmit={handleSubmit}>
        <h1>{formState}</h1>
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
        {formState === "Sign Up" && (
          <div className="input-box">
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FaEnvelope className="icon" />
          </div>
        )}
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

        <button type="submit">{formState}</button>
        <div className="register-link">
          {formState === "Login" ? (
            <p>
              Don't have an account?
              <a href="#" onClick={() => setformState("Sign Up")}>
                Register
              </a>
            </p>
          ) : (
            <p>
              Already registered?
              <a href="#" onClick={() => setformState("Login")}>
                Login
              </a>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
