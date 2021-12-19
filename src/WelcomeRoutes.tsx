import React from 'react';
import { Route, Routes } from 'react-router-dom';

// import Battle from './components/battle/Battle';
// import Leaderboards from './components/leaderboards/Leaderboards';
import Disclaimer from './components/Disclaimer';
import Help from './components/Help';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
// import MyProfile from './components/profile/MyProfile';
// import Profile from './components/profile/Profile';

// import Shop from './components/shop/Shop';

const GameRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/disclaimer" element={<Disclaimer />} />
      <Route path="/help" element={<Help />} />
    </Routes>
  );
};

export default GameRoutes;
