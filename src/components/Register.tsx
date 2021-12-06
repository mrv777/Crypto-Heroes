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
      address: account,
      lvl: 0,
      exp: 0,
      gil: 0,
      team: 'none',
      score: 0,
    });
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

      <button className="btn btn-primary mb-6 mt-8 rounded-none" onClick={handleSignIn}>
        To Battle!
      </button>
    </div>
  );
};

export default Register;
