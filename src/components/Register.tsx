import ardorjs from 'ardorjs';
import * as bip39 from 'bip39-web';
import React from 'react';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { PlayerContext } from '../contexts/playerContext';
import { setToLocalStorage } from '../utils/storage';

const Register = (): ReactElement => {
  const [passphrase, setPassphrase] = useState('');

  let navigate = useNavigate();
  const context = useContext(PlayerContext);

  const handleSignIn = async () => {
    const account = ardorjs.secretPhraseToAccountId(passphrase);
    context.updatePlayerAccount({
      address: account.slice(6),
      passphrase: passphrase,
      lastTraining: 0,
      lastExploring: 0,
      lvl: 0,
      exp: 0,
      gil: 0,
      team: 'none',
      name: null,
      hp: 10,
      score: 0,
      atk: 0,
      def: 0,
      blk: 0,
      crit: 0,
      spd: 0,
    });
    context.updatePlayerAssets({
      helmet: null,
      shield: null,
    });
    context.updatePlayerStatus('idle'); //Make sure the player is set to idle as they are brand new
    setToLocalStorage('Pass', passphrase);
    navigate('/');
  };

  useEffect(() => {
    bip39.generateMnemonicAsync().then((res) => setPassphrase(res));
  }, []);

  return (
    <div className="fixed h-full w-full flex flex-col items-center justify-center text-center">
      <p className="text-2xl">The key to your hero:</p>

      <div className="text-left grid grid-cols-3 gap-4 mt-5 text-small">
        {passphrase.split(' ').map((word, index) => (
          <div key={word}>
            {index + 1}. {word}
          </div>
        ))}
      </div>

      <span className="inline-grid grid-cols-2 gap-x-4">
        <button
          className="btn btn-primary mb-0 mt-8 rounded-none"
          onClick={() => navigator.clipboard.writeText(passphrase)}>
          Copy Passphrase
        </button>

        <button className="btn btn-primary mb-0 mt-8 rounded-none" onClick={handleSignIn}>
          To Battle!
        </button>
      </span>
    </div>
  );
};

export default Register;
