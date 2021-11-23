import React from 'react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const Register = (): ReactElement => {
  return (
    <div className="fixed h-full w-full flex flex-col items-center justify-center">
      <p className="text-2xl">New Player</p>
      <p>This path is currently sealed</p>
      <button>
        <Link to="/">Take me home</Link>
      </button>
    </div>
  );
};

export default Register;
