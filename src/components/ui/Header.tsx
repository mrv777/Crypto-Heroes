import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PlayerContext } from '../../contexts/playerContext';
import {
  getAccountMsgStats,
  getAccountProperties,
  getBlockchainTransactions,
  getExp,
  getIgnisBalance,
  getlastExploringTx,
  getlastTrainingTx,
  getUnconfirmedTxs,
} from '../../utils/ardorInterface';

export const MenuButton = ({
  onClick,
  children,
  disabled,
  classNames,
}: {
  onClick: () => void;
  children?: string | ReactElement | ReactElement[];
  disabled?: boolean;
  classNames?: string;
}) => (
  <button onClick={onClick} disabled={disabled} className={`${classNames}`}>
    {children}
  </button>
);

type Props = {
  disableNavBar?: boolean;
};

const Header = ({ disableNavBar }: Props): ReactElement => {
  let navigate = useNavigate();
  const context = useContext(PlayerContext);
  let [lastTx, setLastTx] = useState<string>('0');
  let [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    async function getCurrentAccountTx() {
      const current_tx = await getBlockchainTransactions(
        'ARDOR-' + context.playerAccount?.address,
      );
      if (
        current_tx?.data.transactions[0] &&
        current_tx?.data.transactions[0].fullHash != lastTx
      ) {
        //If the account has a new transaction, update the hero information
        setLastTx(current_tx?.data.transactions[0].fullHash);
        console.log('New Account Tx');
        const account = 'ARDOR-' + context.playerAccount!.address;

        //Should optimize this by checking what TX's are new and only checking for those type of tx's instead of all that pertain to a player
        //if ()

        const response = await getIgnisBalance(account);
        const propertiesResponse = await getAccountProperties(account, 'cHeroesInfo');
        const statsResponse = await getAccountMsgStats(account);
        const lastTrainingResponse = await getlastTrainingTx(account);
        const lastExploringResponse = await getlastExploringTx(account);
        const expResponse = await getExp(account);

        let team = context.playerAccount!.team;
        let name = null;
        let lastTraining = context.playerAccount!.lastTraining;
        let lastExploring = context.playerAccount!.lastExploring;
        let [exp, score, lvl, atk, def, blk, crit, spd] = [0, 0, 0, 0, 0, 0, 0, 0];
        // Get Player info
        if (
          propertiesResponse &&
          propertiesResponse.data &&
          propertiesResponse.data.properties &&
          propertiesResponse.data.properties[0] &&
          propertiesResponse.data.properties[0].value
        ) {
          let info = JSON.parse(propertiesResponse.data.properties[0].value);
          for (const property in info) {
            if (property.toLowerCase() == 'team') {
              team = info[property];
            } else if (property.toLowerCase() == 'score') {
              score = info[property];
            } else if (property.toLowerCase() == 'name') {
              name = info[property];
            }
          }
        }
        // Get Player stats
        if (
          statsResponse &&
          statsResponse.data &&
          statsResponse.data.transactions &&
          statsResponse.data.transactions[0] &&
          statsResponse.data.transactions[0].attachment &&
          statsResponse.data.transactions[0].attachment.message
        ) {
          let info = JSON.parse(statsResponse.data.transactions[0].attachment.message);
          for (const property in info) {
            if (property.toLowerCase() == 'atk') {
              atk = info[property];
            } else if (property.toLowerCase() == 'def') {
              def = info[property];
            } else if (property.toLowerCase() == 'spd') {
              spd = info[property];
            } else if (property.toLowerCase() == 'lvl') {
              lvl = info[property];
            }
          }
        }
        if (expResponse && expResponse.data && expResponse.data.unitsQNT) {
          exp = expResponse.data.unitsQNT;
        }
        //Check for the last training tx and set the difference from now to see if hero can train again
        //Break out of the loop once we find the first training tx
        if (
          lastTrainingResponse &&
          lastTrainingResponse.data &&
          lastTrainingResponse.data.transfers.length > 0
        ) {
          for (let transfer of lastTrainingResponse.data.transfers) {
            if (
              transfer.recipientRS == account &&
              transfer.senderRS == 'ARDOR-64L4-C4H9-Z9PU-9YKDT'
            ) {
              lastTraining = transfer.timestamp;
              break;
            }
          }
        }
        //Check for the last exploring tx and set the difference from now to see if hero can explore again
        //Break out of the loop once we find the first exploring tx
        if (
          lastExploringResponse &&
          lastExploringResponse.data &&
          lastExploringResponse.data.transfers.length > 0
        ) {
          for (let transfer of lastExploringResponse.data.transfers) {
            if (
              transfer.recipientRS == account &&
              transfer.senderRS == 'ARDOR-64L4-C4H9-Z9PU-9YKDT'
            ) {
              lastExploring = transfer.timestamp;
              break;
            }
          }
        }

        let hp = lvl * 10 + 10;

        context.updatePlayerAccount({
          address: account.slice(6),
          passphrase: context.playerAccount!.passphrase,
          lastTraining: lastTraining,
          lastExploring: lastExploring,
          lvl: lvl,
          exp: exp,
          gil: Math.floor(response?.data.balanceNQT / 1000000),
          name: name,
          team: team,
          score: score,
          hp: hp,
          atk: atk,
          def: def,
          blk: blk,
          crit: crit,
          spd: spd,
        });

        // If no unconfirmed tx from the account, make sure we are idle
        const responseUtx = await getUnconfirmedTxs(account);
        if (
          !responseUtx!.data.unconfirmedTransactions ||
          responseUtx!.data.unconfirmedTransactions.length == 0
        ) {
          // If no unconfirmed tx at all for account, make sure we are idle
          context.updatePlayerStatus('idle');
        } else {
          // If no unconfirmed tx FROM the account or FROM the contract, make sure we are idle
          let utxFromAccount = false;
          for (let unconfirmedTx of responseUtx!.data.unconfirmedTransactions) {
            if (
              unconfirmedTx.senderRS == account ||
              unconfirmedTx.senderRS == 'ARDOR-64L4-C4H9-Z9PU-9YKDT'
            ) {
              if (unconfirmedTx.senderRS == 'ARDOR-64L4-C4H9-Z9PU-9YKDT') {
                context.updatePlayerStatus('Getting results');
              }
              utxFromAccount = true;
              break;
            }
          }
          if (!utxFromAccount) {
            context.updatePlayerStatus('idle');
          }
        }
      }
    }

    //Check player status/info at every interval.  Doing this here since the Header is only loaded when logged in
    const interval = setInterval(() => {
      console.log('Logs every 5s');
      //If there is a new transaction on the account, then update all hero information
      getCurrentAccountTx();
      if (context.playerStatus != 'idle') {
        if (progress < 96) {
          setProgress(progress + 4);
        } else {
          setProgress(0);
        }
      } else if (progress != 0) {
        setProgress(0);
      }
    }, 4000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [lastTx, progress]);

  const handleClick = (path: string) => {
    navigate(path);
  };

  const handleLogOut = () => {
    context.signOut();
    navigate('/');
  };

  return (
    <div className="h-12 lg:h-16 flex px-3 max-w-screen-xl m-auto fixed top-0 inset-x-0 header">
      <MenuButton
        disabled={disableNavBar}
        classNames="SpriteIcons homeIcon"
        onClick={() => handleClick('/')}></MenuButton>
      <MenuButton
        disabled={disableNavBar}
        classNames="SpriteIcons shopIcon"
        onClick={() => handleClick('/shop')}></MenuButton>{' '}
      <MenuButton
        disabled={disableNavBar}
        classNames="SpriteIcons scoreIcon"
        onClick={() => handleClick('/leaderboards')}></MenuButton>
      <div className="flex-1 self-center">
        {context.playerStatus}
        {context.playerStatus != 'idle' && (
          <progress id="playerProgress" max="100" value={progress}></progress>
        )}
      </div>
      {/* <MenuButton disabled={disableNavBar} onClick={() => handleClick('/profile')}>
        Profile
      </MenuButton> */}
      <MenuButton
        disabled={disableNavBar}
        classNames="SpriteIcons logIcon"
        onClick={() => handleClick('/log')}></MenuButton>
      <MenuButton
        disabled={disableNavBar}
        classNames="SpriteIcons helpIcon"
        onClick={() => handleClick('/help')}></MenuButton>
      <MenuButton
        disabled={disableNavBar}
        classNames="SpriteIcons logoutIcon"
        onClick={() => handleLogOut()}></MenuButton>
    </div>
  );
};

export default Header;
