import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DashBoard from './pages/DashBoard';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<DashBoard />} />
    </Routes>
  );
};

export default AppRouter;
