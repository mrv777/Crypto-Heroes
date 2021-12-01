// import ardorjs from 'ardorjs';

// export const getAccountFromPassphrase = (passphrase: String | null) => {
//   return ardorjs.secretPhraseToAccountId(passphrase);
// };

import axios from 'axios';

const nodeUrl = 'https://testnode7.ardor.tools/nxt?';

export const getAccount = async (account: string) => {
  try {
    const response = await axios.get(nodeUrl, {
      params: {
        requestType: 'getAccount',
        account: account,
      },
    });
    return response;
  } catch (error) {
    // handle error
    console.log(error);
  }
};

export const getAccountProperties = async (account?: string, property?: string) => {
  try {
    const response = await axios.get(nodeUrl, {
      params: {
        requestType: 'getAccountProperties',
        recipient: account,
        property: property,
        setter: 'ARDOR-64L4-C4H9-Z9PU-9YKDT',
      },
    });
    return response;
  } catch (error) {
    // handle error
    console.log(error);
  }
};

export const getIgnisBalance = async (account: string) => {
  try {
    const response = await axios.get(nodeUrl, {
      params: {
        requestType: 'getBalance',
        chain: 'ignis',
        account: account,
      },
    });
    return response;
  } catch (error) {
    // handle error
    console.log(error);
  }
};
