import ardorjs from 'ardorjs';
import React, { useContext } from 'react';

import { PlayerContext } from '../contexts/playerContext';
import { broadcast, lvlUp } from '../utils/ardorInterface';

const LevelUp = (): React.ReactElement => {
  const context = useContext(PlayerContext);

  const handleLvlUp = async (opponent: string) => {
    const playerPassphrase = context.playerAccount?.passphrase;
    const battleUnsigned = await lvlUp(
      ardorjs.secretPhraseToPublicKey(playerPassphrase),
      opponent,
    );

    const trainSigned = ardorjs.signTransactionBytes(
      battleUnsigned!.unsignedTransactionBytes,
      playerPassphrase,
    );
    const broadcastTx = await broadcast(
      trainSigned,
      JSON.stringify(battleUnsigned!.transactionJSON.attachment),
    );

    if (broadcastTx && broadcastTx?.data.fullHash) {
      context.updatePlayerStatus('Leveling up...');
    } else {
      context.updatePlayerStatus('Error Leveling up');
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      {context.playerAccount!.lvl === 0 ? (
        <div>
          <p className="text-lg">Pick a team to join</p>
          <ul>
            <li className="text-left mt-2">
              <button onClick={() => handleLvlUp('Ardor')}>Ardor</button>
            </li>
            <li className="text-left mt-2">
              <button onClick={() => handleLvlUp('Ethereum')}>Ethereum</button>
            </li>
            <li className="text-left mt-2">
              <button onClick={() => handleLvlUp('Lisk')}>Lisk</button>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <p className="text-lg">Pick a skill to improve</p>
          <ul>
            <li className="text-left mt-2">
              <button onClick={() => handleLvlUp('ATK')}>Attack</button>
            </li>
            <li className="text-left mt-2">
              <button onClick={() => handleLvlUp('DEF')}>Defense</button>
            </li>
            <li className="text-left mt-2">
              <button onClick={() => handleLvlUp('BLK')}>Block</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LevelUp;
