import React, { useContext } from 'react';

import { PlayerContext } from '../contexts/playerContext';

const LevelUp = (): React.ReactElement => {
  const context = useContext(PlayerContext);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      {context.playerAccount!.lvl === 0 ? (
        <div>
          <p className="text-lg">Pick a team to join</p>
          <ul>
            <li className="text-left mt-2">
              <button>Ardor</button>
            </li>
            <li className="text-left mt-2">
              <button>Ethereum</button>
            </li>
            <li className="text-left mt-2">
              <button>Lisk</button>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <p className="text-lg">Pick a skill to improve</p>
          <ul>
            <li className="text-left mt-2">
              <button>Attack</button>
            </li>
            <li className="text-left mt-2">
              <button>Defense</button>
            </li>
            <li className="text-left mt-2">
              <button>Block</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default LevelUp;
