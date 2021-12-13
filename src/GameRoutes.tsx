import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Battle from './components/Battle';
import Help from './components/Help';
import Home from './components/Home';
import Leaderboards from './components/Leaderboards';
import Log from './components/Log';
import Login from './components/Login';
import Shop from './components/Shop';

// import MyProfile from './components/profile/MyProfile';
// import Profile from './components/profile/Profile';
// import Register from './components/register/Register';

const GameRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/help" element={<Help />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/leaderboards" element={<Leaderboards />} />
      <Route path="/login" element={<Login />} />
      <Route path="/battle" element={<Battle />} />
      <Route path="/log" element={<Log />} />
      {/* <Route exact path="/register" component={Register} />
      <Route path="/profile/:id" component={Profile} />
      <Route exact path="/my-profile" component={MyProfile} />
      <Route exact path="/battle" component={Battle} /> */}
    </Routes>
  );
};

export default GameRoutes;
