import React from 'react';
import './Navbar.css';

const Navbar = () => {

  return (
    <nav className='container'>
      <div className='logo'>
        <img src="/images/iot_logo.png" alt="IoT Logo" />
      </div>
      <div className="class-name">
        <h3>INTERNET OF THINGS - III</h3>
      </div>
      <div className="ct-login">
        <button >Admin Login</button>
      </div>
    </nav>
  );
};

export default Navbar;