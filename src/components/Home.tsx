import React from 'react';
import { ReactElement, useContext } from 'react';
import { Link } from 'react-router-dom';

import { PlayerContext } from '../contexts/playerContext';

const Home = (): ReactElement => {
  const context = useContext(PlayerContext);

  const PowerUp = () => {
    return (
      <div className="flex h-full m-auto justify-center align-middle border-2 border-white bg-gray-500 rounded">
        <div className="text-xs text-gray-400 m-auto">No Item</div>
      </div>
    );
  };

  const renderLabel = (text: string) => (
    <div className="text-xs text-center mt-1">{text}</div>
  );

  //Use for level up text somewhere
  // const renderAction = (text: string, linkText: string, linkPath: string) => (
  //   <div className="mb-6">
  //     <div>{text}</div>

  //     <div className="animate-pulse">
  //       <Link to={linkPath}>{linkText}</Link>
  //     </div>
  //   </div>
  // );

  return (
    <div className="mt-5 grid grid-cols-12 gap-1">
      <div className="text-center col-span-8 bg-gray-600 border-2 border-white border-solid rounded pb-5">
        <p className="tracking-tighter">{context.playerAccount?.address}</p>
        <p>Stats</p>
        <div className="text-left grid grid-cols-12 gap-3 text-xs mx-2">
          <div className="col-span-2">
            <p>HP</p>
            <p>BLK</p>
          </div>
          <div className="col-span-2 text-right">
            <p>10</p>
            <p>3</p>
          </div>
          <div className="col-span-2">
            <p>ATK</p>
            <p>DEF</p>
          </div>
          <div className="col-span-2 text-right">
            <p>5</p>
            <p>2</p>
          </div>
          <div className="col-span-2">
            <p>CRIT</p>
            <p>SPD</p>
          </div>
          <div className="col-span-2 text-right">
            <p>2</p>
            <p>10</p>
          </div>
        </div>
        <p>Power-Ups</p>
        <div className="grid grid-cols-5 gap-2 mx-2">
          <div>
            {<PowerUp />}
            {renderLabel('P1')}
          </div>
          <div>
            {<PowerUp />}
            {renderLabel('P2')}
          </div>
          <div>
            {<PowerUp />}
            {renderLabel('P3')}
          </div>
          <div>
            {<PowerUp />}
            {renderLabel('P4')}
          </div>
          <div>
            {<PowerUp />}
            {renderLabel('P5')}
          </div>
        </div>
        {/* <div className="text-xxs mt-4 mb-4">
            <span className="opacity-50">v0.0.1 - created by MrV</span> <br />
          </div>

          <div className="flex justify-center gap-8">
            <div>
              {renderAction('Time for training?', 'Start training', '/train')}
              {renderAction('View the Champions?', 'View leaderboards', '/leaderboards')}
              {renderAction('How are you doing today?', 'View profile', '/profile')}
            </div>
            <div>
              {renderAction('Ready to start?', "Lets Battle'", '/battle')}
              {renderAction('Have extra money?', 'Head to the shop', '/shop')}
              {renderAction('Need assistance?', 'Help', '/help')}
            </div>
          </div> */}
      </div>
      <div className="text-center col-span-4 bg-gray-600 border-2 border-white border-solid rounded">
        <div className="text-left grid grid-cols-12 gap-3 text-xs mx-1">
          <div className="col-span-3">
            <p>LVL</p>
            <p>GIL</p>
          </div>
          <div className="col-span-9 text-right">
            <p>{context.playerAccount?.lvl}</p>
            <p>{context.playerAccount?.gil}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
