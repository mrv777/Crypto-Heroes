export type PlayerContextType = {
  updatePlayerAccount: (accountProps: AccountProps | null) => void;
  playerAccount: AccountProps | null;
  updatePlayerStatus: (status: string | null) => void;
  playerStatus: string | null;
  signOut: () => void;
};

export type AccountProps = {
  address: string;
  passphrase: string;
  lastTraining: number;
  lvl: number;
  exp: number;
  gil: number;
  team: string;
  score: number;
  hp: number;
  atk: number;
  def: number;
  blk: number;
  crit: number;
  spd: number;
};
