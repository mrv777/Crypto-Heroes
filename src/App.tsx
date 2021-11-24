import './App.css';

// import _ from 'lodash';
import React, { useEffect, useState } from 'react';

import Header from './components/ui/Header';
import { PlayerContext } from './contexts/playerContext';
import GameRoutes from './GameRoutes';
import { AccountProps } from './types';
import WelcomeRoutes from './WelcomeRoutes';

function App() {
  const [playerAccount, setPlayerAccount] = useState<AccountProps | null>(null);
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
    const resizeListener = () => {
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
    };
    // set resize listener
    window.addEventListener('resize', resizeListener);

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener);
    };
  }, []);

  const updatePlayerAccount = (accountProps: AccountProps | null) => {
    setPlayerAccount(accountProps);
  };

  const signOut = () => {
    setPlayerAccount(null);
  };

  return (
    <div>
      {orientation != 'portrait' ? (
        <PlayerContext.Provider
          value={{
            updatePlayerAccount,
            playerAccount,
            signOut,
          }}>
          {playerAccount ? (
            <>
              <Header disableNavBar={false} />
              <div className="content-container">
                <div className="content-height overflow-y-auto overflow-x-hidden px-4">
                  <GameRoutes />
                </div>
              </div>
            </>
          ) : (
            <WelcomeRoutes />
          )}
        </PlayerContext.Provider>
      ) : (
        <div className="fixed h-full w-full flex flex-col items-center text-center justify-center">
          <p className="text-xl">Please View in Landscape</p>
        </div>
      )}
    </div>
  );
}

export default App;
