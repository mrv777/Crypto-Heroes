import React, { ReactElement, useContext, useEffect, useState } from 'react';

import { PlayerContext } from '../contexts/playerContext';
import { getLog } from '../utils/ardorInterface';

const Log = (): ReactElement => {
  const [entries, setEntries] = useState<any>(null);
  const context = useContext(PlayerContext);

  useEffect(() => {
    async function fetchLeaders() {
      const logAPI = await getLog('ARDOR-' + context.playerAccount!.address);
      if (logAPI && logAPI.data && logAPI.data.transactions.length > 0) {
        let formattedEntries: object[] = [];
        for (let tx of logAPI.data.transactions) {
          if (tx.attachment && tx.attachment.property) {
            if (tx.attachment.property == 'score') {
              formattedEntries.push({ timestamp: tx.timestamp, type: 'Battle' });
            } else if (tx.attachment.property == 'level') {
              formattedEntries.push({ timestamp: tx.timestamp, type: 'Level Up' });
            }
          } else if (tx.attachment && tx.attachment.currency == '13943488548174745464') {
            formattedEntries.push({ timestamp: tx.timestamp, type: 'Train' });
          }
        }
        setEntries(formattedEntries);
      } else {
        setEntries([]);
      }
    }

    fetchLeaders();
  }, [entries]);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <p className="text-2xl">Log</p>
      <div className="w-full grid grid-cols-4 gap-4">
        <div className="underline col-span-3">Time</div>
        <div className="underline text-right">Type</div>
        {!entries ? (
          <p>Loading...</p>
        ) : (
          entries.map((entry) => (
            <div className="grid grid-cols-4 col-span-4" key={entry.timestamp}>
              <div className="col-start-1 col-end-4">{entry.timestamp}</div>
              <div className="col-start-4 col-end-4">{entry.type}</div>
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

export default Log;
