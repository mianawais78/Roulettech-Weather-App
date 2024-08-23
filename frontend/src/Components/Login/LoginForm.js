// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import "./LoginForm.css";
// import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";
// import { login } from "../../store/actions/authActions";
// import { config } from "../Config";

// function LoginForm() {
//   const [formState, setFormState] = useState("Login");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     const requestBody = {
//       username: username,
//       password: password,
//       ...(formState === "Sign Up" && { email: email }),
//     };

//     const endpoint = formState === "Login" ? "/login/" : "/register/";

//     fetch(`${config.apiBaseUrl}${endpoint}`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestBody),
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         } else {
//           throw new Error(`${formState} failed`);
//         }
//       })
//       .then((data) => {
//         if (formState === "Login") {
//           if (data.access) {
//             dispatch(login(data.access, data.username));
//             navigate("/home");
//           } else {
//             throw new Error("Invalid JWT token");
//           }
//         } else {
//           alert("Signup successful! Please log in.");
//           setFormState("Login");
//         }
//       })
//       .catch((error) => {
//         console.log(`${formState} failed:`, error);
//       });
//   };

//   return (
//     <div className="main-div">
//       <div className="wrapper">
//         <form onSubmit={handleSubmit}>
//           <h1>{formState}</h1>
//           <div className="input-box">
//             <input
//               type="text"
//               placeholder="Username"
//               required
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//             <FaUserAlt className="icon" />
//           </div>
//           {formState === "Sign Up" && (
//             <div className="input-box">
//               <input
//                 type="email"
//                 placeholder="Email"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//               <FaEnvelope className="icon" />
//             </div>
//           )}
//           <div className="input-box">
//             <input
//               type="password"
//               placeholder="Password"
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <FaLock className="icon" />
//           </div>

//           <button type="submit">{formState}</button>
//           <div className="register-link">
//             {formState === "Login" ? (
//               <p>
//                 Don't have an account?
//                 <a href="#" onClick={() => setFormState("Sign Up")}>
//                   Register
//                 </a>
//               </p>
//             ) : (
//               <p>
//                 Already registered?
//                 <a href="#" onClick={() => setFormState("Login")}>
//                   Login
//                 </a>
//               </p>
//             )}
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default LoginForm;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import { FaUserAlt, FaLock, FaEnvelope } from "react-icons/fa";
import { login } from "../../store/actions/authActions";
import { config } from "../Config";

function LoginForm() {
  const [formState, setFormState] = useState("Login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // State to hold error message
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();

    const requestBody = {
      username: username,
      password: password,
      ...(formState === "Sign Up" && { email: email }),
    };

    const endpoint = formState === "Login" ? "/login/" : "/register/";

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
          throw new Error("Login failed"); // Changed error message
        }
      })
      .then((data) => {
        if (formState === "Login") {
          if (data.access) {
            dispatch(login(data.access, data.username));
            navigate("/home");
          } else {
            throw new Error("Invalid JWT token");
          }
        } else {
          alert("Signup successful! Please log in.");
          setFormState("Login");
        }
      })
      .catch((error) => {
        console.log(error);
        // Set a user-friendly error message
        setError(
          formState === "Login"
            ? "Invalid username or password!"
            : "Signup failed. Please try again!"
        );
      });
  };

  return (
    <div className="main-div">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
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
          {error && <p className="error-message">{error}</p>}{" "}
          {/* Display error message */}
          <button type="submit">{formState}</button>
          <div className="register-link">
            {formState === "Login" ? (
              <p>
                Don't have an account?
                <a href="#" onClick={() => setFormState("Sign Up")}>
                  Register
                </a>
              </p>
            ) : (
              <p>
                Already registered?
                <a href="#" onClick={() => setFormState("Login")}>
                  Login
                </a>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
