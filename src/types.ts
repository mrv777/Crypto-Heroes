export type PlayerContextType = {
  updatePlayerAccount: (accountProps: AccountProps | null) => void;
  playerAccount: AccountProps | null;
  updatePlayerAssets: (assetsProps: AssetsProps | null) => void;
  playerAssets: AssetsProps | null;
  updatePlayerStatus: (status: string | null) => void;
  playerStatus: string | null;
  signOut: () => void;
};

export type AccountProps = {
  address: string;
  passphrase: string;
  lastTraining: number;
  lastExploring: number;
  lvl: number;
  exp: number;
  gil: number;
  team: string;
  name: string | null;
  score: number;
  hp: number;
  atk: number;
  def: number;
  blk: number;
  crit: number;
  spd: number;
};

export type AssetsProps = {
  helmet: string | null;
  shield: string | null;
};
