import React from 'react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const Home = (): ReactElement => {
  const renderAction = (text: string, linkText: string, linkPath: string) => (
    <div className="mb-6">
      <div>{text}</div>

      <div className="animate-pulse">
        <Link to={linkPath}>{linkText}</Link>
      </div>
    </div>
  );

  return (
    <div className="mt-5 grid grid-cols-12 gap-1">
      <div className="text-center col-span-8 bg-gray-600 border-2 border-white border-solid rounded">
        Player
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
        Stats
        <div className="text-left grid grid-cols-12 gap-3 text-xs mx-1">
          <div className="col-span-3">
            <p>HP</p>
            <p>ATK</p>
            <p>DEF</p>
          </div>
          <div className="col-span-3 text-right">
            <p>10</p>
            <p>3</p>
            <p>2</p>
          </div>
          <div className="col-span-3">
            <p>BLK</p>
            <p>CRIT</p>
            <p>SPD</p>
          </div>
          <div className="col-span-3 text-right">
            <p>5</p>
            <p>2</p>
            <p>10</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
