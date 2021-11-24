import React from 'react';
import { ReactElement, useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { PlayerContext } from '../contexts/playerContext';
import { isValidPassphrase } from '../utils/helpers';
import Error from './ui/Error';
import Input from './ui/Input';

const Login = (): ReactElement => {
  const [passphrase, setPassphrase] = useState('n k l o i u i o o o o o');
  const [error, setError] = useState('');

  let navigate = useNavigate();
  const context = useContext(PlayerContext);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setPassphrase(e.target.value.trim());
    setPassphrase(e.target.value);
  };

  const handleSignIn = async () => {
    setError('');

    if (!isValid) {
      setError('Please enter a valid passphrase of 12 words');
      return;
    }

    context.login();
    navigate('/');

    //   const { address } = cryptography.getAddressAndPublicKeyFromPassphrase(passphrase);
    //   const account = await getAccount(cryptography.bufferToHex(address));

    //   if (!account || !isAlive(account.rpg)) {
    //     setError('Invalid account (already dead?)');
    //     return;
    //   }

    //   const credentials = getCredentials(passphrase);
    //   context.updatePlayerCredentials(credentials);
    //   history.push('/my-profile');
  };

  const isValid = isValidPassphrase(passphrase);

  return (
    <div className="fixed h-full w-full flex flex-col items-center justify-center">
      <div className="m-auto text-center">
        <h1 className="mb-12">Welcome back, hero</h1>

        <div className="m-auto">
          <Input
            value={passphrase}
            type="text"
            onChange={handleInputChange}
            label="Enter passphrase"
            placeholder="Enter passphrase"
            isValid={isValidPassphrase(passphrase)}
          />
          {error && <Error message={error} />}

          <button
            className="btn btn-primary mb-12 mt-8 rounded-none"
            onClick={handleSignIn}>
            Sign In
          </button>

          <p>
            Don't have a passphrase? <Link to="/register">Register here</Link>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
