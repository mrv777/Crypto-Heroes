export type PlayerContextType = {
  updatePlayerAccount: (accountProps: AccountProps | null) => void;
  playerAccount: AccountProps | null;
  signOut: () => void;
};

export type AccountProps = {
  address: string;
  lvl: number;
  exp: number;
  gil: number;
  team: string;
  score: number;
};
