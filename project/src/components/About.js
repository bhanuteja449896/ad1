import React from 'react';
import './css/About.css';

const About = () => {
  return (
    <div className="about-container">
      <div className="text-container">
        <h1 className="heading">No need to worry about important notes</h1>
        <p className="sub-heading">All your essential notes are just a click away.</p>
      </div>
      <div className="text-container">
        <h1 className="heading">Download all Notes here on one platform</h1>
        <p className="sub-heading">Your one-stop solution for all study materials.</p>
      </div>
      <div className="image-container">
        <img src="/images/students-downloading.png" alt="Students downloading files" className="download-image" />
      </div>
    </div>
  );
};

export default About;
