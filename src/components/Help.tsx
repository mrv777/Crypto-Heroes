import React from 'react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const Help = (): ReactElement => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <p className="text-2xl">Help me</p>
      <p>Sorry, there is no one around</p>
      <button>
        <Link to="/">Take me home</Link>
      </button>
    </div>
  );
};

export default Help;
