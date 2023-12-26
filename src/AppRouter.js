import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import DashBoard from './pages/DashBoard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<DashBoard />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
};

export default AppRouter;
