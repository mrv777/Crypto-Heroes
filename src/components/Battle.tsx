import ardorjs from 'ardorjs';
import React, { useContext, useEffect, useState } from 'react';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';

import sprite from '../assets/sprite_single.png';
import { PlayerContext } from '../contexts/playerContext';
import { battle, broadcast, getAccountProperties } from '../utils/ardorInterface';

const Battle = (): ReactElement => {
  const [opponents, setOpponents] = useState<any>(null);
  const context = useContext(PlayerContext);
  let navigate = useNavigate();

  useEffect(() => {
    async function fetchLeaders() {
      const opponents: object[] = [];
      const OpponentsAPI = await getAccountProperties(undefined, 'cHeroesInfo');
      OpponentsAPI!.data.properties.forEach(function (opponent) {
        if (opponent.value) {
          let opponentInfo = JSON.parse(opponent.value);
          opponentInfo['recipientRS'] = opponent.recipientRS;
          if (
            opponentInfo['team'].toLowerCase() !=
            context.playerAccount!.team.toLowerCase()
          ) {
            opponents.push(opponentInfo);
          }
        }
      });

      setOpponents(opponents);
    }

    fetchLeaders();
  }, []);

  const handleBattle = async (opponent: string) => {
    const playerPassphrase = context.playerAccount?.passphrase;
    const battleUnsigned = await battle(
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
      context.updatePlayerStatus('Battling');
      navigate('/');
    } else {
      context.updatePlayerStatus('Error Battling');
    }
  };

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <p className="text-2xl">Enemy Heroes</p>
      <div className="w-full grid grid-cols-3 gap-3">
        {!opponents ? (
          <p>Loading...</p>
        ) : (
          opponents.map((opponent) => (
            <button
              key={opponent.recipient}
              onClick={() => handleBattle(opponent.recipientRS)}>
              {opponent.name}
              <br />
              <img className="inline-block h-32" src={sprite} alt={opponent.name} />
              <br />
              {opponent.team}
              <br />
              Score: {opponent.score}
            </button>
          ))
        )}
      </div>

      {/* <div className="w-full grid grid-cols-4 gap-4">
        <div className="underline col-span-3">Name</div>
        <div className="underline text-right">Team</div>
        {!opponents ? (
          <p>Loading...</p>
        ) : (
          opponents
            .filter((opponent) => opponent.value != context.playerAccount?.team)
            .map((opponent) => (
              <button
                className="grid grid-cols-4 col-span-4"
                key={opponent.recipient}
                onClick={() => handleBattle(opponent.recipientRS)}>
                <div className="col-start-1 col-end-4 text-left">
                  {opponent.recipientRS.slice(6)}
                </div>
                <div className="col-start-4 col-end-4 text-right">{opponent.value}</div>
              </button>
            ))
        )}
      </div> */}
    </div>
  );
};

export default Battle;
