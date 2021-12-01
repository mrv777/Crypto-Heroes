import React from 'react';
import { ReactElement, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getAccountProperties } from '../utils/ardorInterface';

const Leaderboards = (): ReactElement => {
  const [leaders, setLeaders] = useState<any>([{ recipient: 0, value: 0 }]);

  // const handleSignIn = async () => {
  //   const account = ardorjs.secretPhraseToAccountId(passphrase);
  //   context.updatePlayerAccount({
  //     address: account,
  //     lvl: 0,
  //     exp: 0,
  //     gil: 0,
  //     team: 'none',
  //     score: 0,
  //   });
  //   navigate('/');
  // };

  useEffect(() => {
    async function fetchLeaders() {
      const leaderAPI = await getAccountProperties(undefined, 'score');
      setLeaders(leaderAPI!.data.properties);
    }

    fetchLeaders();
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <p className="text-2xl">Leaderboards</p>
      <div className="w-full grid grid-cols-4 gap-4">
        <div className="underline col-span-3">Name</div>
        <div className="underline text-right">Score</div>
        {leaders
          .sort((a, b) => (a.value < b.value ? 1 : -1))
          .map((leader, index) => (
            <div className="grid grid-cols-4 col-span-4" key={leader.recipient}>
              <div className="col-start-1 col-end-4">{leader.recipientRS}</div>
              <div className="col-start-4 col-end-4 text-right">{leader.value}</div>
            </div>
          ))}
      </div>
      {/* <p>There is no one...</p>
      <button>
        <Link to="/">Exit</Link>
      </button> */}
    </div>
  );
};

export default Leaderboards;
