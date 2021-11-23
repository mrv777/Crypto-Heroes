import { createContext } from 'react';

import { PlayerContextType } from '../types';

// This needs to be initialized with the correct fields
export const PlayerContext = createContext<PlayerContextType>({
  login: () => null,
  playerAccount: null,
  signOut: () => null,
});
