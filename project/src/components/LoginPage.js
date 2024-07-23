import React from "react";
import "./LoginPage.css";

const LoginPage = () => {
  return (
    <div className="main">
      <div className="login-page">
        <div className="login-form">
            <div className="login-heading">
              <h4>Login</h4>
            </div>
          <form className="login-form-data">
            <input type="text" placeholder="email" />
            <input type="password" placeholder="password" />
            <button>login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
