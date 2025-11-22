// src/AppRouter.jsx
import React from 'react';
import { BrowserRouter, Routes, Route, StaticRouter } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Posts from './Posts';

const Router = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/posts" element={<Posts />} />
    {/* Add other routes */}
  </Routes>
);

// This component determines which router to use based on the environment.
const AppRouter = ({ location }) => {
  if (typeof window === 'undefined') {
    // Server side
    return (
      <StaticRouter location={location}>
        <Router />
      </StaticRouter>
    );
  }
  // Client side
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default AppRouter;
