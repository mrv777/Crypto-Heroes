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
        <div className="absolute top-0 left-0 h-full w-full justify-center align-middle border-2 border-white bg-gray-500 opacity-30 rounded">
          {/* <div className="text-xs text-gray-400 m-auto">None</div> */}
        </div>
      </div>
    );
  };

  //Use for level up text somewhere
  const renderAction = (linkText: string, linkPath: string) => (
    <div className="animate-pulse inline h-full">
      <Link to={linkPath}>{linkText}</Link>
    </div>
  );

  return (
    <div className="mt-3 grid grid-cols-12 gap-1">
      <div className="text-center col-span-8 p-4 xl:p-10 SpriteUI containerUI">
        <p className="tracking-tighter text-sm">{context.playerAccount?.address}</p>
        <div className="text-left grid grid-cols-12 gap-3 text-xs mx-2">
          <div className="col-span-6">
            <div className="w-full flex flex-col items-center justify-center m-auto">
              <SpriteAnimator
                sprite={sprite}
                width={16}
                height={23}
                scale={0.2}
                fps={4}
                frameCount={4}
                direction={'horizontal'}
              />
            </div>
            <div className="text-left grid grid-cols-12 gap-3 text-xs mx-2">
              <div className="col-span-6 text-left">
                <p>
                  LVL
                  {renderAction('⬆', '/')}
                </p>
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
              </div>
              <div className="col-span-6 text-right">
                <p>{context.playerAccount?.lvl}</p>
                <p>
                  {context.playerAccount?.exp}/{context.playerAccount!.lvl * 2 + 10}
                </p>
                <p>{context.playerAccount?.gil}</p>
              </div>
            </div>
          </div>
          <div className="col-span-6 mt-5">
            <div className="text-right grid grid-cols-3 gap-3 text-xs mx-2">
              <div className="col-start-2 col-span-1">{<PowerUp />}</div>
              <div className="col-start-1 col-span-1">{<PowerUp />}</div>
              <div className="col-start-2 col-span-1">{<PowerUp />}</div>
              <div className="col-start-3 col-span-1">{<PowerUp />}</div>
              <div className="col-start-1 col-span-2 flex items-center">Tarasca</div>
              <div className="col-start-3 col-span-1">{<PowerUp />}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center col-span-4 p-3 xl:p-9 SpriteUI containerUI">
        <div className="text-left grid grid-cols-12 gap-3 text-xs mx-1">
          <div className="col-span-4">
            <p>HP</p>
            <p>BLK</p>
            <p>ATK</p>
            <p>DEF</p>
            <p>CRIT</p>
            <p>SPD</p>
            <p>&nbsp;</p>
            <p>TEAM</p>
            <p>SCORE</p>
          </div>
          <div className="col-span-8 text-right">
            <p>10</p>
            <p>3</p>
            <p>5</p>
            <p>2</p>
            <p>2</p>
            <p>10</p>
            <p>&nbsp;</p>
            <p className="capitalize">{context.playerAccount?.team}</p>
            <p>{context.playerAccount?.score}</p>
          </div>
        </div>
        <div className="text-center grid grid-cols-2 gap-0 text-xs">
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
