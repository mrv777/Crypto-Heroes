import React from 'react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const Welcome = (): ReactElement => {
  return (
    <div className="fixed h-full w-full flex flex-col items-center justify-center">
      <p className="text-3xl text-center animate-pulse mb-12">Crypto Heroes</p>
      <ul className="list-outside space-y-3 uppercase">
        <li className="hover:list-square">
          <Link to="/register">New Player</Link>
        </li>
        <li className="hover:list-square">
          <Link to="/login">Returning Player</Link>
        </li>
        {/* <li className="hover:list-square">
          <Link to="/help">Help</Link>
        </li> */}
      </ul>
    </div>
  );
};

export default Welcome;
