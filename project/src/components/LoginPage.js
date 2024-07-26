import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/credentials.json");
      const credentials = await response.json();

      if (email === credentials.username && password === credentials.password) {
        setLoginStatus("success");
        setTimeout(() => {
          navigate("/admin"); // Redirect to the admin page
        }, 2000);
      } else {
        setLoginStatus("error");
        setTimeout(() => setLoginStatus(null), 2000); // Hide error after 2 seconds
      }
    } catch (error) {
      console.error("Failed to fetch credentials:", error);
      setLoginStatus("error");
      setTimeout(() => setLoginStatus(null), 2000); // Hide error after 2 seconds
    }
  };

  return (
    <div className="main">
      <div className="login-page">
        <div className={`login-form ${loginStatus}`}>
          <div className="login-heading">
            <h4>Login</h4>
          </div>
          <form className="login-form-data" onSubmit={handleLogin}>
            <input 
              type="text" 
              placeholder="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              type="password" 
              placeholder="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button type="submit">Login</button>
          </form>
          {loginStatus === "error" && (
            <div className="login-animation error">❌</div>
          )}
          {loginStatus === "success" && (
            <div className="login-animation success">✔️</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
