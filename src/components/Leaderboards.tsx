import React from 'react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const Leaderboards = (): ReactElement => {
  return (
    <div className="fixed h-full w-full flex flex-col items-center justify-center">
      <p className="text-2xl">Leaderboards</p>
      <div className="w-full grid grid-cols-3 gap-4">
        <div className="underline">Name</div>
        <div className="underline">Team</div>
        <div className="underline">Score</div>
      </div>
      <p>There is no one...</p>
      <button>
        <Link to="/">Exit</Link>
      </button>
    </div>
  );
};

export default Leaderboards;
