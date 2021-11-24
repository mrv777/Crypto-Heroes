export type PlayerContextType = {
  login: () => void;
  playerAccount: AccountProps | null;
  signOut: () => void;
};

export type AccountProps = {
  address: string;
  lvl: number;
  gil: number;
};
