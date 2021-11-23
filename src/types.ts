export type PlayerContextType = {
  login: () => void;
  playerAccount: String | null;
  signOut: () => void;
};
