import ardorjs from 'ardorjs';
import React, { useContext, useState } from 'react';

import { PlayerContext } from '../contexts/playerContext';
import { broadcast, lvlUp } from '../utils/ardorInterface';
import { isValidName } from '../utils/helpers';
import Input from './ui/Input';

const LevelUp = (props): React.ReactElement => {
  const [name, setName] = useState('');
  const context = useContext(PlayerContext);
  const teams = ['Ardor', 'Ethereum', 'Lisk'];
  const skills = ['ATK', 'DEF', 'BLK'];

  let choices = teams;
  if (context.playerAccount!.lvl > 1) {
    choices = skills;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value.trim());
  };

  const handleLvlUp = async (lvlUpMsg: string) => {
    const playerPassphrase = context.playerAccount?.passphrase;
    const lvlUpUnsigned = await lvlUp(
      ardorjs.secretPhraseToPublicKey(playerPassphrase),
      lvlUpMsg,
    );

    //Function from parent to close the modal
    const closeFunction = () => {
      props.closeFunction();
    };

    const lvlUpSigned = ardorjs.signTransactionBytes(
      lvlUpUnsigned!.unsignedTransactionBytes,
      playerPassphrase,
    );
    const broadcastTx = await broadcast(
      lvlUpSigned,
      JSON.stringify(lvlUpUnsigned!.transactionJSON.attachment),
    );

    closeFunction();
    if (broadcastTx && broadcastTx?.data.fullHash) {
      context.updatePlayerStatus('Leveling up...');
    } else {
      context.updatePlayerStatus('Error Leveling up');
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      {context.playerAccount!.lvl == 3 ? (
        <div>
          <p className="text-lg">What is your name?</p>
          <Input
            value={name}
            type="text"
            onChange={handleInputChange}
            label="Enter name"
            placeholder="Enter name"
            isValid={isValidName(name)}
          />
          <button className="mb-3" onClick={() => handleLvlUp('{name}')}>
            Continue
          </button>
        </div>
      ) : (
        <div>
          <p className="text-lg">Please choose</p>
          <div className="inline-grid grid-cols-3 gap-x-4 my-5">
            {choices.map((choice, index) => (
              <button key={index} onClick={() => handleLvlUp('{choice}')}>
                {choice}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LevelUp;
