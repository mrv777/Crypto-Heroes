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
    <div className="mt-5 grid grid-cols-12 gap-4">
      <div className="text-center col-span-8 bg-gray-600">
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
      <div className="text-center col-span-4 bg-gray-400">Stats</div>
    </div>
  );
};

export default Home;
