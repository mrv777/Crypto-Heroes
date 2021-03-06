import './App.css';

// import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { AddToHomeScreen } from 'react-pwa-add-to-homescreen';

import Header from './components/ui/Header';
import { PlayerContext } from './contexts/playerContext';
import GameRoutes from './GameRoutes';
import { AccountProps, AssetsProps } from './types';
import { removeItemFromStorage } from './utils/storage';
import WelcomeRoutes from './WelcomeRoutes';

function App() {
  const [playerAccount, setPlayerAccount] = useState<AccountProps | null>(null);
  const [playerAssets, setPlayerAssets] = useState<AssetsProps | null>(null);
  const [playerStatus, setPlayerStatus] = useState<string | null>('idle');
  const [orientation, setOrientation] = useState<String>(
    (window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth) <
      (window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight)
      ? 'portrait'
      : 'landscape',
  );

  // Code to detect landscape viewing
  useEffect(() => {
    const resizeListener = debounce(() => {
      setOrientation(
        (window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth) <
          (window.innerHeight ||
            document.documentElement.clientHeight ||
            document.body.clientHeight)
          ? 'portrait'
          : 'landscape',
      );
    }, 100); // 100ms
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  const debounce = (func, delay) => {
    let timer;
    return () => {
      let self = debounce;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(self, args);
      }, delay);
    };
  };

  const updatePlayerAccount = (accountProps: AccountProps | null) => {
    setPlayerAccount(accountProps);
  };

  const updatePlayerAssets = (assetsProps: AssetsProps | null) => {
    setPlayerAssets(assetsProps);
  };

  const updatePlayerStatus = (status: string | null) => {
    setPlayerStatus(status);
  };

  const signOut = () => {
    removeItemFromStorage('Pass');
    setPlayerAccount(null);
    setPlayerAssets(null);
  };

  return (
    <div>
      {orientation != 'portrait' ? (
        <PlayerContext.Provider
          value={{
            updatePlayerAccount,
            playerAccount,
            updatePlayerAssets,
            playerAssets,
            updatePlayerStatus,
            playerStatus,
            signOut,
          }}>
          {playerAccount ? (
            <>
              <Header disableNavBar={false} />
              <div className="content-container max-w-screen-xl m-auto pt-12 lg:pt-16">
                <div className="content-height overflow-y-auto overflow-x-hidden px-3">
                  <GameRoutes />
                </div>
              </div>
            </>
          ) : (
            <WelcomeRoutes />
          )}
          <AddToHomeScreen />
        </PlayerContext.Provider>
      ) : (
        <div className="fixed h-full w-full flex flex-col items-center text-center justify-center">
          <p className="text-xl">Please View in Landscape</p>
          <AddToHomeScreen />
        </div>
      )}
    </div>
  );
}

export default App;
