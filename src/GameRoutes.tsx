import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Help from './components/Help';
import Home from './components/Home';
import Login from './components/Login';
// import Battle from './components/battle/Battle';
// import Leaderboards from './components/leaderboards/Leaderboards';
// import MyProfile from './components/profile/MyProfile';
// import Profile from './components/profile/Profile';
// import Register from './components/register/Register';
// import Shop from './components/shop/Shop';

const GameRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/help" element={<Help />} />
      {/* <Route exact path="/shop" component={Shop} />
      <Route exact path="/leaderboards" component={Leaderboards} /> */}
      <Route path="/login" element={<Login />} />
      {/* <Route exact path="/register" component={Register} />
      <Route path="/profile/:id" component={Profile} />
      <Route exact path="/my-profile" component={MyProfile} />
      <Route exact path="/battle" component={Battle} /> */}
    </Routes>
  );
};

export default GameRoutes;
