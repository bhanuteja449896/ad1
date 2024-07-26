import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();

  const handleAdminLoginClick = () => {
    navigate('/');
  };

  return (
    <nav className='container'>
      <div className='logo'>
        <img src="/images/iot_logo.png" alt="IoT Logo" />
      </div>
      <div className="class-name">
        <h3>INTERNET OF THINGS - III</h3>
      </div>
      <div className="ct-login">
        <button onClick={handleAdminLoginClick}>Home</button>
      </div>
    </nav>
  );
};

export default Navbar;
