import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const Help = (): ReactElement => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <p className="text-2xl">Disclaimer</p>
      <p className="mb-4">
        Your use of the Service is at your sole risk. The Service is provided on an “AS
        IS” and “AS AVAILABLE” basis. The Service is provided without warranties of any
        kind, whether express or implied, including, but not limited to, implied
        warranties of merchantability, fitness for a particular purpose, non-infringement
        or course of performance.
      </p>
      <button>
        <Link to="/">Take me home</Link>
      </button>
    </div>
  );
};

export default Help;
