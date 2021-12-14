import React, { ReactElement, useContext, useEffect, useState } from 'react';

import { PlayerContext } from '../contexts/playerContext';
import { getLog } from '../utils/ardorInterface';
import { getTxDate } from '../utils/helpers';

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
              formattedEntries.push({
                id: tx.fullHash,
                timestamp: new Date(getTxDate(tx.timestamp) * 1000).toLocaleString(),
                type: 'Battle',
              });
            } else if (tx.attachment.property == 'level') {
              formattedEntries.push({
                id: tx.fullHash,
                timestamp: new Date(getTxDate(tx.timestamp) * 1000).toLocaleString(),
                type: 'Level Up to ' + tx.attachment.value,
              });
            }
          } else if (tx.attachment && tx.attachment.currency == '13943488548174745464') {
            formattedEntries.push({
              id: tx.fullHash,
              timestamp: new Date(getTxDate(tx.timestamp) * 1000).toLocaleString(),
              type: 'Trained for ' + tx.attachment.unitsQNT + ' exp',
            });
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
      <p className="text-2xl">Hero Log</p>
      {/* <div className="w-full grid grid-cols-4 gap-4">
        {!entries ? (
          <p>Loading...</p>
        ) : (
          entries.map((entry) => (
            <div className="grid grid-cols-4 col-span-4 text-xs" key={entry.id}>
              <div className="col-start-1 col-end-3">{entry.timestamp}</div>
              <div className="col-span-2">{entry.type}</div>
            </div>
          ))
        )}
      </div> */}
      {!entries ? (
        <p>Loading...</p>
      ) : (
        entries.map((entry) => (
          <div className="text-left text-xs w-full" key={entry.id}>
            {entry.timestamp} - {entry.type}
          </div>
        ))
      )}
      {/* <p>There is no one...</p>
      <button>
        <Link to="/">Exit</Link>
      </button> */}
    </div>
  );
};

export default Log;
