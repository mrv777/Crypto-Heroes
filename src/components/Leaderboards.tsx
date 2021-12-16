import React from 'react';
import { ReactElement, useEffect, useState } from 'react';

import { getAccountProperties } from '../utils/ardorInterface';

const Leaderboards = (): ReactElement => {
  const [leaders, setLeaders] = useState<any>(null);

  useEffect(() => {
    async function fetchLeaders() {
      const leaders: object[] = [];
      const leaderAPI = await getAccountProperties(undefined, 'cHeroesInfo');
      leaderAPI!.data.properties.forEach(function (leader) {
        if (leader.value) {
          let leadertInfo = JSON.parse(leader.value);
          leadertInfo['key'] = leader.recipient;
          leaders.push(leadertInfo);
        }
      });

      setLeaders(leaders);
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
            .sort((a, b) => (a.score < b.score ? 1 : -1))
            .map((leader) => (
              <div className="grid grid-cols-4 col-span-4" key={leader.recipient}>
                <div className="col-start-1 col-end-4">{leader.name}</div>
                <div className="col-start-4 col-end-4 text-right">{leader.score}</div>
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
