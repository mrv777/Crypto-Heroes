import React from 'react';
import { ReactElement, useEffect, useState } from 'react';

import { getAccountProperties } from '../utils/ardorInterface';

const Leaderboards = (): ReactElement => {
  const [leaders, setLeaders] = useState<any>(null);

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
        {!leaders ? (
          <p>Loading...</p>
        ) : (
          leaders
            .sort((a, b) => (a.value < b.value ? 1 : -1))
            .map((leader) => (
              <div className="grid grid-cols-4 col-span-4" key={leader.recipient}>
                <div className="col-start-1 col-end-4">{leader.recipientRS.slice(6)}</div>
                <div className="col-start-4 col-end-4 text-right">{leader.value}</div>
              </div>
            ))
        )}
      </div>
      {/* <p>There is no one...</p>
      <button>
        <Link to="/">Exit</Link>
      </button> */}
    </div>
  );
};

export default Leaderboards;
