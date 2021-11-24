import * as bip39 from 'bip39-web';
import React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Register = (): ReactElement => {
  const [passphrase, setPassphrase] = useState('');
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

      <button>
        <Link to="/">Take me home</Link>
      </button>
    </div>
  );
};

export default Register;
