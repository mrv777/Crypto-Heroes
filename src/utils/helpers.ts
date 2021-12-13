export const isValidPassphrase = (passphrase: string) => {
  const words = passphrase.split(' ');
  return words.length === 12;
};

export const isValidName = (name: string) => {
  const regex = /^[A-Za-z]{3,16}$/;
  return !!regex.exec(name);
};

export const timestampDiff = (timestamp: number) => {
  const diff =
    Math.floor(Date.now() / 1000) -
    Math.floor(new Date('2017-12-26T14:00:00Z').getTime() / 1000) -
    timestamp;
  return diff;
};

export const getTxDate = (timestamp: number) => {
  const unixTimestamp =
    Math.floor(new Date('2017-12-26T14:00:00Z').getTime() / 1000) + timestamp;
  return unixTimestamp;
};
