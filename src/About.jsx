// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div>
      <h1>About Page</h1>
      <p>This is a simple page to test routing.</p>
      <nav>
        <Link to="/">Go back to Home</Link>
      </nav>
    </div>
  );
};

export default About;
