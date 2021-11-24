import React from 'react';
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';

const Shop = (): ReactElement => {
  return (
    <div className="fixed h-full w-full flex flex-col items-center justify-center">
      <p className="text-2xl">Shop</p>
      <p>The store is empty...</p>
      <button>
        <Link to="/">Exit</Link>
      </button>
    </div>
  );
};

export default Shop;
