import ardorjs from 'ardorjs';
import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { PlayerContext } from '../contexts/playerContext';
import {
  getAccountProperties,
  getIgnisBalance,
  getUnconfirmedTxs,
} from '../utils/ardorInterface';
import { isValidPassphrase } from '../utils/helpers';
import { getFromLocalStorage, setToLocalStorage } from '../utils/storage';
import Error from './ui/Error';
import Input from './ui/Input';

const Login = (): ReactElement => {
  const [passphrase, setPassphrase] = useState('testl');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [savePass, setSavePass] = useState(true);

  let navigate = useNavigate();
  const context = useContext(PlayerContext);

  useEffect(() => {
    const savedPass = getFromLocalStorage('Pass');
    console.log(savedPass);
    if (savedPass) {
      setPassphrase(savedPass);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setPassphrase(e.target.value.trim());
    setPassphrase(e.target.value);
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSignIn();
    }
  };

  const handleCheckChange = () => {
    // setPassphrase(e.target.value.trim());
    setSavePass(!savePass);
  };

  const handleSignIn = async () => {
    setLoading(true);
    setError('');

    // if (!isValid) {
    //   setError('Please enter a valid passphrase of 12 words');
    //   return;
    // }
    const account = ardorjs.secretPhraseToAccountId(passphrase);
    const response = await getIgnisBalance(account);
    const propertiesResponse = await getAccountProperties(account);
    if (!response || !propertiesResponse) {
      setError('Error connecting');
      setLoading(false);
      return;
    }

    let team = 'none';
    let score = 0;
    let lvl = 0;
    if (
      propertiesResponse?.data.properties &&
      propertiesResponse?.data.properties[0] &&
      propertiesResponse?.data.properties[0].value
    ) {
      let prop_array = propertiesResponse?.data.properties;
      prop_array.forEach(function (item) {
        if (item.property.toLowerCase() == 'team') {
          team = item.value;
        } else if (item.property.toLowerCase() == 'score') {
          score = item.value;
        } else if (item.property.toLowerCase() == 'level') {
          lvl = item.value;
        }
      });
    }

    context.updatePlayerAccount({
      address: account.slice(6),
      passphrase: passphrase,
      lvl: lvl,
      exp: 7,
      gil: Math.floor(response?.data.balanceNQT / 1000000),
      team: team,
      score: score,
    });

    if (savePass) {
      setToLocalStorage('Pass', passphrase);
    }

    context.updatePlayerStatus('idle'); //Should actually check the blockchain to see if the player has an unconfirmed transaction
    const responseUtx = await getUnconfirmedTxs(account);
    if (
      responseUtx?.data.unconfirmedTransactions &&
      responseUtx?.data.unconfirmedTransactions.length > 0
    ) {
      //Check if any unconfirmed txs are a hero action
      responseUtx?.data.unconfirmedTransactions.forEach(function (tx) {
        if (tx.recipientRS == 'ARDOR-64L4-C4H9-Z9PU-9YKDT') {
          //Tx is to contract account so check why
          if (tx.attachment.message.includes('abc')) {
            context.updatePlayerStatus('Training...');
          } else if (tx.attachment.message.includes('battle')) {
            context.updatePlayerStatus('Battling...');
          }
        }
      });
    }

    setLoading(false);
    navigate('/');
  };

  //const isValid = isValidPassphrase(passphrase);

  return (
    <div className="fixed h-full w-full flex flex-col items-center justify-center">
      <div className="m-auto text-center">
        <h1 className="mb-12">Welcome back, hero</h1>

        <div className="m-auto">
          <Input
            value={passphrase}
            type="text"
            onChange={handleInputChange}
            onKeyPress={handleKeypress}
            label="Enter passphrase"
            placeholder="Enter passphrase"
            isValid={isValidPassphrase(passphrase)}
          />
          <p>
            <label>
              <input
                checked={savePass}
                type="checkbox"
                onChange={handleCheckChange}
                className="mr-4"
              />
              Remember me?
            </label>
          </p>
          {error && <Error message={error} />}

          <button
            className="btn btn-primary mb-6 mt-8 rounded-none"
            onClick={handleSignIn}
            disabled={loading}>
            Sign In
          </button>

          <p>
            Do not have a passphrase?{' '}
            <Link to="/register" className="underline">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
