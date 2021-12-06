import ardorjs from 'ardorjs';
import qs from 'qs';
import React from 'react';
import { ReactElement, useContext } from 'react';
import { Link } from 'react-router-dom';
import { SpriteAnimator } from 'react-sprite-animator';

import coin from '../assets/Coin-Sheet.png';
import sprite from '../assets/sprite.png';
import { PlayerContext } from '../contexts/playerContext';
import { broadcast, train } from '../utils/ardorInterface';
import Tooltip from './ui/Tooltip';

const Home = (): ReactElement => {
  const context = useContext(PlayerContext);
  let frameStart = 0;
  if (context.playerAccount?.address[6].match(/[a-m]/i)) {
    frameStart = 4;
  } else if (context.playerAccount?.address[6].match(/[n-z]/i)) {
    frameStart = 8;
  }

  const PowerUp = (item: string) => {
    return (
      <div className="w-full h-0 pt-full relative">
        <div className="absolute top-0 left-0 h-full w-full justify-center align-middle border-2 border-white bg-gray-500 opacity-20 rounded">
          <div className={`opacity-30 ArmoryIcons h-full w-full ${item}Icon`}></div>
        </div>
      </div>
    );
  };

  const handleTraining = async () => {
    const playerPassphrase = context.playerAccount?.passphrase;
    const trainUnsigned = await train(ardorjs.secretPhraseToPublicKey(playerPassphrase));
    console.log(trainUnsigned);
    const trainSigned = ardorjs.signTransactionBytes(
      trainUnsigned!.unsignedTransactionBytes,
      playerPassphrase,
    );
    const broadcastTx = await broadcast(
      trainSigned,
      JSON.stringify(trainUnsigned!.transactionJSON.attachment),
    );
    console.log(broadcastTx);
  };

  //Use for level up text somewhere
  const renderAction = (linkText: string, linkPath: string) => (
    <div className="animate-pulse inline h-full">
      <Link to={linkPath}>{linkText}</Link>
    </div>
  );

  return (
    <div className="grid grid-cols-12 gap-1">
      <div className="col-span-8 p-4 xl:p-10 SpriteUI containerUI">
        <div className="text-left h-full grid grid-cols-12 gap-1 mr-2">
          <p className="tracking-tighter col-span-12 text-center">
            {context.playerAccount?.address}
          </p>
          <div className="col-span-6 flex flex-col">
            <div className="w-full flex flex-col items-center justify-center m-auto">
              <SpriteAnimator
                sprite={sprite}
                width={48}
                height={36}
                scale={0.3}
                fps={4}
                frameCount={frameStart + 4}
                startFrame={frameStart}
                direction={'horizontal'}
              />
            </div>
            <div className="text-left grid grid-cols-12 gap-3 mx-2">
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
            <div className="text-right grid grid-cols-3 gap-1 text-xs mx-2">
              <div className="col-start-2 col-span-1">{PowerUp('helmet')}</div>
              <div className="col-start-1 col-span-1">{PowerUp('weapon')}</div>
              <div className="col-start-2 col-span-1">{PowerUp('armor')}</div>
              <div className="col-start-3 col-span-1">{PowerUp('shield')}</div>
              <p className="col-start-1 col-span-2 grid items-center">No Companion</p>
              <div className="col-start-3 col-span-1">
                <Tooltip
                  tooltip={
                    <div className="text-left">
                      <p>Mythical beings</p>
                    </div>
                  }>
                  {PowerUp('companion')}
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center col-span-4 p-3 xl:p-9 SpriteUI containerUI">
        <div className="text-left h-full grid grid-cols-12 gap-3 text-xs mr-1">
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
          <div className="text-center col-span-12 grid grid-cols-2 gap-0 text-xs">
            <div>
              <button
                disabled={context.playerAccount!.gil < 5000}
                onClick={handleTraining}>
                Train
              </button>
            </div>
            <div>
              <button disabled={context.playerAccount!.gil < 50000}>Fight</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
