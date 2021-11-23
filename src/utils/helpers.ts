export const isValidPassphrase = (passphrase: string) => {
  const words = passphrase.split(' ');
  return words.length === 12;
};

export const isValidName = (name: string) => {
  const regex = /^[A-Za-z]{3,16}$/;
  return !!regex.exec(name);
};
