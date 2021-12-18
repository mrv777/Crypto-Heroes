import ardorjs from 'ardorjs';
import React, { ReactElement, useContext, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { SpriteAnimator } from 'react-sprite-animator';

import staticCoin from '../assets/Coin.png';
import coin from '../assets/Coin-Sheet.png';
import sprite from '../assets/sprite.png';
import { PlayerContext } from '../contexts/playerContext';
import { broadcast, explore, train } from '../utils/ardorInterface';
import { timestampDiff } from '../utils/helpers';
import LevelUp from './LevelUp';
import Tooltip from './ui/Tooltip';

const Home = (): ReactElement => {
  const [modalGilIsOpen, setGilIsOpen] = React.useState(false);
  const [modalLvlIsOpen, setLvlIsOpen] = React.useState(false);
  const [lastTraining, setLastTraining] = React.useState(0);
  const [lastExploring, setLastExplore] = React.useState(0);
  const [lastStudy, setLastStudy] = React.useState(0);
  const context = useContext(PlayerContext);
  console.log(context);
  let navigate = useNavigate();

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: 'black',
      border: '3px solid white',
      textAlign: 'center',
    },
  };

  //** Test code for different character based on account address */
  let frameStart = 0;
  if (context.playerAccount?.address[6].match(/[a-m]/i)) {
    frameStart = 4;
  } else if (context.playerAccount?.address[6].match(/[n-z]/i)) {
    frameStart = 8;
  }
  /************ */

  useEffect(() => {
    //Check that player has enough balance to play
    console.log('Check GIL balance');
    if (context.playerAccount!.gil < 10) {
      setGilIsOpen(true);
    } else {
      setGilIsOpen(false);
    }
    //Get time since last training tx when the screen loads
    setLastTraining(timestampDiff(context.playerAccount!.lastTraining));
    setLastExplore(timestampDiff(context.playerAccount!.lastExploring));

    const interval = setInterval(() => {
      // To prevent too many unnecessary rerenders, only update the state if the last training when the screen was loaded was less then 1 hour and now its at least an hour
      console.log('Last Training: ' + lastTraining);
      console.log('Last Exploring: ' + lastExploring);
      console.log(timestampDiff(context.playerAccount!.lastExploring));
      if (
        lastTraining < 3600 &&
        timestampDiff(context.playerAccount!.lastTraining) >= 3600
      ) {
        setLastTraining(timestampDiff(context.playerAccount!.lastTraining));
        context.updatePlayerAccount({
          address: context.playerAccount!.passphrase,
          passphrase: context.playerAccount!.passphrase,
          lastTraining: timestampDiff(context.playerAccount!.lastTraining),
          lastExploring: context.playerAccount!.lastExploring,
          lvl: context.playerAccount!.lvl,
          exp: context.playerAccount!.exp,
          gil: context.playerAccount!.gil,
          name: context.playerAccount!.name,
          team: context.playerAccount!.team,
          score: context.playerAccount!.score,
          hp: context.playerAccount!.hp,
          atk: context.playerAccount!.atk,
          def: context.playerAccount!.def,
          blk: context.playerAccount!.blk,
          crit: context.playerAccount!.crit,
          spd: context.playerAccount!.spd,
        });
      }
      // Only update the explore state if the last exploring when the screen was loaded was less then 24 hour and now its at least 24 hours
      if (
        lastExploring < 86400 &&
        timestampDiff(context.playerAccount!.lastExploring) >= 86400
      ) {
        setLastExplore(timestampDiff(context.playerAccount!.lastExploring));
        context.updatePlayerAccount({
          address: context.playerAccount!.passphrase,
          passphrase: context.playerAccount!.passphrase,
          lastTraining: context.playerAccount!.lastTraining,
          lastExploring: timestampDiff(context.playerAccount!.lastExploring),
          lvl: context.playerAccount!.lvl,
          exp: context.playerAccount!.exp,
          gil: context.playerAccount!.gil,
          name: context.playerAccount!.name,
          team: context.playerAccount!.team,
          score: context.playerAccount!.score,
          hp: context.playerAccount!.hp,
          atk: context.playerAccount!.atk,
          def: context.playerAccount!.def,
          blk: context.playerAccount!.blk,
          crit: context.playerAccount!.crit,
          spd: context.playerAccount!.spd,
        });
      }
    }, 5000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [lastTraining, lastExploring]);

  /** Functions to close modals */
  function closeGilModal() {
    setGilIsOpen(false);
  }
  function closeLvlModal() {
    setLvlIsOpen(false);
  }
  /************ */

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

    const trainSigned = ardorjs.signTransactionBytes(
      trainUnsigned!.unsignedTransactionBytes,
      playerPassphrase,
    );
    const broadcastTx = await broadcast(
      trainSigned,
      JSON.stringify(trainUnsigned!.transactionJSON.attachment),
    );

    if (broadcastTx && broadcastTx?.data.fullHash) {
      context.updatePlayerStatus('Training');
    } else {
      context.updatePlayerStatus('Error Training');
    }
  };
  const handleBattle = async () => {
    navigate('/battle');
  };
  const handleStudy = async () => {
    navigate('/battle');
  };
  const handleExplore = async () => {
    const playerPassphrase = context.playerAccount?.passphrase;
    const trainUnsigned = await explore(
      ardorjs.secretPhraseToPublicKey(playerPassphrase),
    );

    const trainSigned = ardorjs.signTransactionBytes(
      trainUnsigned!.unsignedTransactionBytes,
      playerPassphrase,
    );
    const broadcastTx = await broadcast(
      trainSigned,
      JSON.stringify(trainUnsigned!.transactionJSON.attachment),
    );

    if (broadcastTx && broadcastTx?.data.fullHash) {
      context.updatePlayerStatus('Exploring');
    } else {
      context.updatePlayerStatus('Error Exploring');
    }
  };

  //Use for level up text somewhere
  // const renderAction = (linkText: string, linkPath: string) => (
  //   <div className="animate-pulse inline h-full">
  //     <Link to={linkPath}>{linkText}</Link>
  //   </div>
  // );

  return (
    <div className="grid grid-cols-12 gap-1">
      <div className="col-span-8 p-4 xl:p-10 SpriteUI containerUI">
        <div className="text-left h-full grid grid-cols-12 gap-1 mr-2">
          <p className="tracking-tighter col-span-12 text-center">
            {context.playerAccount!.name && context.playerAccount!.name != 'none'
              ? context.playerAccount!.name
              : context.playerAccount!.address}
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
              <div className="col-span-4 text-left">
                <p>
                  LVL
                  {context.playerAccount!.exp > context.playerAccount!.lvl * 100 + 500 ? (
                    <span
                      onClick={() => setLvlIsOpen(true)}
                      onKeyDown={() => setLvlIsOpen(true)}
                      role="presentation">
                      ⬆
                    </span>
                  ) : (
                    ''
                  )}
                </p>
                <p>EXP</p>
                <p
                  className="flex"
                  onClick={() => setGilIsOpen(true)}
                  onKeyDown={() => setGilIsOpen(true)}
                  role="presentation">
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
              <div className="col-span-8 text-right">
                <p>{context.playerAccount!.lvl}</p>
                <p>
                  {context.playerAccount!.exp}/{context.playerAccount!.lvl * 100 + 500}
                </p>
                <p
                  onClick={() => setGilIsOpen(true)}
                  onKeyDown={() => setGilIsOpen(true)}
                  role="presentation">
                  {context.playerAccount?.gil}
                </p>
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
                      <p>Mythical beings card</p>
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
        <div className="text-left h-full grid grid-cols-12 gap-1 text-xs mr-1">
          <div className="col-span-4">
            <p>HP</p>
            <p>ATK</p>
            <p>DEF</p>
            <p>SPD</p>
            <p>BLK</p>
            <p>CRIT</p>
          </div>
          <div className="col-span-8 text-right">
            <p>{context.playerAccount!.hp}</p>
            <p>{context.playerAccount!.atk}</p>
            <p>{context.playerAccount!.def}</p>
            <p>{context.playerAccount!.spd}</p>
            <p>{context.playerAccount!.blk}</p>
            <p>{context.playerAccount!.crit}</p>
          </div>
          <div className="col-span-4">
            <p>TEAM</p>
            <p>SCORE</p>
          </div>
          <div className="col-span-8 text-right">
            <p className="capitalize">{context.playerAccount!.team}</p>
            <p>{context.playerAccount!.score}</p>
          </div>
          <div className="text-center col-span-12 grid grid-cols-2 gap-0">
            <div className="my-1">
              <button
                className="text-tiny p-1 w-full"
                disabled={
                  context.playerAccount!.gil < 10 ||
                  context.playerStatus != 'idle' ||
                  lastTraining < 3600
                }
                onClick={handleTraining}>
                Train
                <br />
                <span className="text-center">
                  10
                  <img className="inline-block h-3 w-3" src={staticCoin} alt="Coin" />
                </span>
              </button>
            </div>
            <div className="m-1">
              <button
                className="text-tiny p-1 w-full"
                disabled={
                  context.playerAccount!.gil < 100 ||
                  context.playerStatus != 'idle' ||
                  context.playerAccount!.lvl < 2
                }
                onClick={handleBattle}>
                Fight
                <br />
                <span className="text-center">
                  100
                  <img className="inline-block h-3 w-3" src={staticCoin} alt="Coin" />
                </span>
              </button>
            </div>
            <div className="my-1">
              <button
                className="text-tiny p-1 w-full"
                disabled={
                  context.playerAccount!.gil < 10 ||
                  context.playerStatus != 'idle' ||
                  lastExploring < 86400
                }
                onClick={handleExplore}>
                Explore
                <br />
                <span className="text-center">
                  10
                  <img className="inline-block h-3 w-3" src={staticCoin} alt="Coin" />
                </span>
              </button>
            </div>
            <div className="m-1">
              <button
                className="text-tiny p-1 w-full"
                disabled={
                  context.playerAccount!.gil < 10 ||
                  context.playerStatus != 'idle' ||
                  lastStudy < 3600
                }
                onClick={handleStudy}>
                Study
                <br />
                <span className="text-center">
                  10
                  <img className="inline-block h-3 w-3" src={staticCoin} alt="Coin" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalGilIsOpen}
        style={customStyles}
        onRequestClose={closeGilModal}
        contentLabel="GIL Deposits">
        <p>Deposit addresses for GIL:</p>
        <p>IGNIS - ARDOR-{context.playerAccount?.address}</p>
        <p>ARDOR - Coming Soon</p>
        <p>BTC - Coming Soon</p>
        <p>ETH - Coming Soon</p>
        <p>LSK - Coming Soon</p>
        <button onClick={closeGilModal}>close</button>
      </Modal>
      <Modal
        isOpen={modalLvlIsOpen}
        style={customStyles}
        onRequestClose={closeLvlModal}
        contentLabel="Level up hero">
        <LevelUp closeFunction={() => closeLvlModal()} />
        <button onClick={closeLvlModal}>close</button>
      </Modal>
    </div>
  );
};

export default Home;
