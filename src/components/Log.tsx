import React, { ReactElement, useContext, useEffect, useState } from 'react';

import { PlayerContext } from '../contexts/playerContext';
import { getLog } from '../utils/ardorInterface';
import { getTxDate } from '../utils/helpers';

const Log = (): ReactElement => {
  const [entries, setEntries] = useState<any>(null);
  const context = useContext(PlayerContext);
  const equipment = [
    { name: 'Basic Helmet', asset: '1745859205102112069' },
    { name: 'Basic Shield', asset: '14946868744803041742' },
  ];

  useEffect(() => {
    async function fetchEntries() {
      // Get executed transactions
      const logAPI = await getLog('ARDOR-' + context.playerAccount!.address);
      if (logAPI && logAPI.data && logAPI.data.transactions.length > 0) {
        let formattedEntries: any[] = [];
        console.log(logAPI.data.transactions[0]);
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
          } else if (
            tx.attachment &&
            !tx.attachment.property &&
            tx.attachment.message &&
            tx.attachment.currency != '13943488548174745464' &&
            !tx.attachment.asset
          ) {
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
          } else if (tx.attachment && tx.attachment.asset) {
            let foundEquipment = equipment.find((obj) => {
              return obj.asset == tx.attachment.asset;
            });

            formattedEntries.push({
              id: tx.fullHash,
              timestamp: new Date(getTxDate(tx.timestamp) * 1000).toLocaleString(),
              type: 'Explored and found ' + foundEquipment?.name,
            });
          }
        }
        setEntries(formattedEntries);
      } else {
        setEntries([
          {
            id: 1,
            timestamp: new Date().toLocaleString(),
            type: 'You have not done anything yet',
          },
        ]);
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
