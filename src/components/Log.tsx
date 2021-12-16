import React, { ReactElement, useContext, useEffect, useState } from 'react';

import { PlayerContext } from '../contexts/playerContext';
import { getLog } from '../utils/ardorInterface';
import { getTxDate } from '../utils/helpers';

const Log = (): ReactElement => {
  const [entries, setEntries] = useState<any>(null);
  const context = useContext(PlayerContext);

  useEffect(() => {
    async function fetchEntries() {
      // Get executed transations
      const logAPI = await getLog('ARDOR-' + context.playerAccount!.address);
      if (logAPI && logAPI.data && logAPI.data.transactions.length > 0) {
        let formattedEntries: any[] = [];
        for (var i = 0; i < logAPI.data.transactions.length; i++) {
          let tx = logAPI.data.transactions[i];
          if (
            tx.attachment &&
            tx.attachment.property &&
            tx.attachment.property == 'cHeroesInfo' &&
            tx.attachment.message
          ) {
            let msgAttachment = JSON.parse(tx.attachment.message);
            if (msgAttachment.won) {
              let battleMsg;
              try {
                if (msgAttachment.won == 'ARDOR-' + context.playerAccount!.address) {
                  battleMsg = 'WON vs ' + msgAttachment.loss.slice(6);
                } else {
                  battleMsg = 'LOSS vs ' + msgAttachment.won.slice(6);
                }
              } catch {
                battleMsg = 'Unknown Battle';
              }
              formattedEntries.push({
                id: tx.fullHash,
                timestamp: new Date(getTxDate(tx.timestamp) * 1000).toLocaleString(),
                type: battleMsg,
              });
            }
            // } else if (tx.attachment.property == 'level') {
            //   formattedEntries.push({
            //     id: tx.fullHash,
            //     timestamp: new Date(getTxDate(tx.timestamp) * 1000).toLocaleString(),
            //     type:
            //       'Level Up to ' +
            //       tx.attachment.value +
            //       ', ' +
            //       logAPI.data.transactions[i + 1].attachment.property +
            //       ' to ' +
            //       logAPI.data.transactions[i + 1].attachment.value,
            //   });
            // }
          } else if (tx.attachment && !tx.attachment.property && tx.attachment.message) {
            let msgAttachment = JSON.parse(tx.attachment.message);
            if (msgAttachment.LVL) {
              formattedEntries.push({
                id: tx.fullHash,
                timestamp: new Date(getTxDate(tx.timestamp) * 1000).toLocaleString(),
                type: 'Level Up to ' + msgAttachment.LVL,
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

    fetchEntries();
  }, []);

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
