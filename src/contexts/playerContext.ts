import { createContext } from 'react';

import { PlayerContextType } from '../types';

// This needs to be initialized with the correct fields
export const PlayerContext = createContext<PlayerContextType>({
  updatePlayerAccount: () => null,
  playerAccount: null,
  updatePlayerStatus: () => null,
  playerStatus: null,
  signOut: () => null,
});
