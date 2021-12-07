export type PlayerContextType = {
  updatePlayerAccount: (accountProps: AccountProps | null) => void;
  playerAccount: AccountProps | null;
  signOut: () => void;
};

export type AccountProps = {
  address: string;
  passphrase: string;
  lvl: number;
  exp: number;
  gil: number;
  team: string;
  score: number;
  status: string;
};
