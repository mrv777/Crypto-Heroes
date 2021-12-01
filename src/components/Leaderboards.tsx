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
      <div className="w-full grid grid-cols-3 gap-4">
        <div className="underline">Name</div>
        <div className="underline">Team</div>
        <div className="underline">Score</div>
        {leaders
          .sort((a, b) => (a.value < b.value ? 1 : -1))
          .map((leader, index) => (
            <div className="grid grid-cols-3 col-span-3" key={leader.recipient}>
              <div className="col-start-1 col-end-1">{leader.recipientRS}</div>
              <div className="col-start-3 col-end-3">{leader.value}</div>
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
