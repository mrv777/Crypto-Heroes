import React from 'react';
import { ReactElement, useContext } from 'react';
import { Link } from 'react-router-dom';
import { SpriteAnimator } from 'react-sprite-animator';

import coin from '../assets/Coin-Sheet.png';
import sprite from '../assets/sprite.png';
import { PlayerContext } from '../contexts/playerContext';

const Home = (): ReactElement => {
  const context = useContext(PlayerContext);

  const PowerUp = () => {
    return (
      <div className="w-full h-0 pt-full relative">
        <div className="absolute top-0 left-0 h-full w-full justify-center align-middle border-2 border-white bg-gray-500 rounded">
          <div className="text-xs text-gray-400 m-auto">No Item</div>
        </div>
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
    <div className="mt-3 grid grid-cols-12 gap-1">
      <div className="text-center col-span-8 bg-gray-600 border-2 border-white border-solid rounded pb-5">
        <p className="tracking-tighter">{context.playerAccount?.address}</p>
        <p className="underline">Stats</p>
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
        <p className="underline">Power-Ups</p>
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
        <div className="w-full flex flex-col items-center justify-center m-auto">
          <SpriteAnimator
            sprite={sprite}
            width={16}
            height={26}
            scale={0.25}
            fps={4}
            frameCount={4}
            direction={'horizontal'}
          />
        </div>
        <div className="text-left grid grid-cols-12 gap-3 text-xs mx-1">
          <div className="col-span-4">
            <p>LVL</p>
            <p>EXP</p>
            <p className="flex">
              GIL
              <SpriteAnimator
                sprite={coin}
                width={8}
                height={8}
                scale={0.6}
                fps={4}
                frameCount={4}
                direction={'horizontal'}
              />
            </p>
            <p>TEAM</p>
            <p>SCORE</p>
          </div>
          <div className="col-span-8 text-right">
            <p>{context.playerAccount?.lvl}</p>
            <p>
              {context.playerAccount?.exp}/{context.playerAccount!.lvl * 2 + 10}
            </p>
            <p>{context.playerAccount?.gil}</p>
            <p className="capitalize">{context.playerAccount?.team}</p>
            <p>{context.playerAccount?.score}</p>
          </div>
        </div>
        <div className="text-center grid grid-cols-2 gap-0 text-xs mb-4">
          <div>
            <button disabled={context.playerAccount!.gil < 5000}>Train</button>
          </div>
          <div>
            <button disabled={context.playerAccount!.gil < 50000}>Fight</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
