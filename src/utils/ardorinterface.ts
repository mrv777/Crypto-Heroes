// import ardorjs from 'ardorjs';

// export const getAccountFromPassphrase = (passphrase: String | null) => {
//   return ardorjs.secretPhraseToAccountId(passphrase);
// };

import axios from 'axios';
import qs from 'qs';

const nodeUrl = 'https://testnode7.ardor.tools/nxt?';
const contractAccount = 'ARDOR-64L4-C4H9-Z9PU-9YKDT';

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
        setter: contractAccount,
      },
    });
    return response;
  } catch (error) {
    // handle error
    console.log(error);
  }
};

export const getAccountMsgStats = async (account: string, lastIndex: number = 0) => {
  try {
    const response = await axios.get(nodeUrl, {
      params: {
        requestType: 'getExecutedTransactions',
        chain: 'ignis',
        sender: contractAccount,
        recipient: account,
        type: 1,
        lastIndex: lastIndex,
      },
    });
    return response;
  } catch (error) {
    // handle error
    console.log(error);
  }
};

export const getBlockchainTransactions = async (account: string) => {
  try {
    const response = await axios.get(nodeUrl, {
      params: {
        chain: 'ignis',
        requestType: 'getBlockchainTransactions',
        account: account,
        firstIndex: '0',
        lastIndex: '0',
      },
    });
    return response;
  } catch (error) {
    // handle error
    console.log(error);
  }
};

// We want to look for the last experience earned from training by look at the currency transfer
export const getlastTrainingTx = async (account: string) => {
  try {
    const response = await axios.get(nodeUrl, {
      params: {
        currency: '13943488548174745464',
        requestType: 'getCurrencyTransfers',
        account: account,
      },
    });
    return response;
  } catch (error) {
    // handle error
    console.log(error);
  }
};
export const getlastExploringTx = async (account: string) => {
  try {
    const response = await axios.get(nodeUrl, {
      params: {
        requestType: 'getAssetTransfers',
        account: account,
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

//Exp is a MS currency to prevent transfers while allowing redemption
export const getExp = async (account: string) => {
  try {
    const response = await axios.get(nodeUrl, {
      params: {
        requestType: 'getAccountCurrencies',
        currency: '13943488548174745464',
        account: account,
      },
    });
    return response;
  } catch (error) {
    // handle error
    console.log(error);
  }
};

export const getUnconfirmedTxs = async (account: string) => {
  try {
    const response = await axios.get(nodeUrl, {
      params: {
        requestType: 'getUnconfirmedTransactions',
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

export const getAssetsByIssuer = async (account: string) => {
  try {
    const response = await axios.get(nodeUrl, {
      params: {
        requestType: 'getAssetsByIssuer',
        account: account,
      },
    });
    return response;
  } catch (error) {
    // handle error
    console.log(error);
  }
};

export const getAccountAssets = async (account: string) => {
  try {
    const response = await axios.get(nodeUrl, {
      params: {
        requestType: 'getAccountAssets',
        account: account,
        includeAssetInfo: true,
      },
    });
    return response;
  } catch (error) {
    // handle error
    console.log(error);
  }
};

export const getStoreAssets = async () => {
  try {
    const response = await axios.get(nodeUrl, {
      params: {
        requestType: 'getAssetsByIssuer',
        account: 'ARDOR-NXK4-YSP8-X5RR-5JSAB',
      },
    });
    return response;
  } catch (error) {
    // handle error
    console.log(error);
  }
};

export const train = async (publicKey: string) => {
  try {
    const response = await axios.post(
      nodeUrl + 'requestType=sendMoney',
      qs.stringify({
        chain: 'ignis',
        recipient: contractAccount,
        message: '{"contract": "Heroes","params": {"expMsg": "abc"}}',
        feeNQT: 3000000,
        amountNQT: 97000000,
        messageIsPrunable: true,
        publicKey: publicKey,
        deadline: 60,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );
    return response.data;
  } catch (error) {
    // handle error
    console.log(error);
  }
};
export const explore = async (publicKey: string) => {
  try {
    const response = await axios.post(
      nodeUrl + 'requestType=sendMoney',
      qs.stringify({
        chain: 'ignis',
        recipient: contractAccount,
        message: '{"contract": "Heroes","params": {"expMsg": "defg"}}',
        feeNQT: 3000000,
        amountNQT: 97000000,
        messageIsPrunable: true,
        publicKey: publicKey,
        deadline: 60,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );
    return response.data;
  } catch (error) {
    // handle error
    console.log(error);
  }
};
export const battle = async (publicKey: string, opponent: string) => {
  try {
    const response = await axios.post(
      nodeUrl + 'requestType=sendMoney',
      qs.stringify({
        chain: 'ignis',
        recipient: contractAccount,
        message:
          '{"contract": "Heroes","params": {"expMsg": "battle", "battleMsg": "' +
          opponent +
          '"}}',
        feeNQT: 3000000,
        amountNQT: 997000000,
        messageIsPrunable: true,
        publicKey: publicKey,
        deadline: 60,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );
    return response.data;
  } catch (error) {
    // handle error
    console.log(error);
  }
};
export const lvlUp = async (publicKey: string, statChoice: string, level: number) => {
  let units = level * 100 + 500;
  try {
    const response = await axios.post(
      nodeUrl + 'requestType=transferCurrency',
      qs.stringify({
        chain: 'ignis',
        currency: '13943488548174745464',
        recipient: contractAccount,
        message:
          '{"contract": "Heroes","params": {"expMsg": "levelUp","statUp":"' +
          statChoice +
          '"}}',
        feeNQT: 3000000,
        unitsQNT: units,
        messageIsPrunable: true,
        publicKey: publicKey,
        deadline: 60,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );
    return response.data;
  } catch (error) {
    // handle error
    console.log(error);
  }
};

export const broadcast = async (signedTx: string, prunableAttachmentJSON?: string) => {
  try {
    const response = await axios.post(
      nodeUrl + 'requestType=broadcastTransaction',
      qs.stringify({
        transactionBytes: signedTx,
        prunableAttachmentJSON: prunableAttachmentJSON,
      }),
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );
    return response;
  } catch (error) {
    // handle error
    console.log(error);
  }
};

export const getLastBlock = async () => {
  try {
    const response = await axios.get(nodeUrl, {
      params: {
        requestType: 'getBlocks',
        firstIndex: '0',
        lastIndex: '0',
        includeTransactions: 'true',
      },
    });
    return response;
  } catch (error) {
    // handle error
    console.log(error);
  }
};

export const getLog = async (account?: string) => {
  try {
    const response = await axios.get(nodeUrl, {
      params: {
        requestType: 'getExecutedTransactions',
        chain: 'ignis',
        sender: contractAccount,
        recipient: account,
      },
    });
    return response;
  } catch (error) {
    // handle error
    console.log(error);
  }
};
