import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { PlayerContext } from '../../contexts/playerContext';
import {
  getAccountProperties,
  getBlockchainTransactions,
  getExp,
  getIgnisBalance,
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
        const response = await getIgnisBalance(account);
        const propertiesResponse = await getAccountProperties(account);
        const lastTrainingResponse = await getlastTrainingTx(account);
        const expResponse = await getExp(account);

        let team = context.playerAccount!.team;
        let lastTraining = context.playerAccount!.lastTraining;
        let [exp, score, lvl, atk, def, blk, crit, spd] = [0, 0, 0, 0, 0, 0, 0, 0];
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
            } else if (item.property.toLowerCase() == 'atk') {
              atk = item.value;
            } else if (item.property.toLowerCase() == 'def') {
              def = item.value;
            } else if (item.property.toLowerCase() == 'blk') {
              blk = item.value;
            } else if (item.property.toLowerCase() == 'crit') {
              crit = item.value;
            } else if (item.property.toLowerCase() == 'spd') {
              spd = item.value;
            }
          });
        }
        if (expResponse) {
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

        let hp = lvl * 10 + 10;

        context.updatePlayerAccount({
          address: account.slice(6),
          passphrase: context.playerAccount!.passphrase,
          lastTraining: lastTraining,
          lvl: lvl,
          exp: exp,
          gil: Math.floor(response?.data.balanceNQT / 1000000),
          team: team,
          score: score,
          hp: hp,
          atk: atk,
          def: def,
          blk: blk,
          crit: crit,
          spd: spd,
        });

        // If no unconfirmed tx for the account, make sure we are idle
        const responseUtx = await getUnconfirmedTxs(account);
        if (
          !responseUtx!.data.unconfirmedTransactions ||
          responseUtx!.data.unconfirmedTransactions.length == 0
        ) {
          context.updatePlayerStatus('idle');
        }
      }
    }

    //Check player status/info at every interval.  Doing this here since the Header is only loaded when logged in
    const interval = setInterval(() => {
      console.log('Logs every 5s');
      //If there is a new transaction on the account, then update all hero information
      getCurrentAccountTx();
    }, 5000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [lastTx]);

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
      <div className="flex-1 self-center">{context.playerStatus}</div>
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
