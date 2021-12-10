// import ardorjs from 'ardorjs';

// export const getAccountFromPassphrase = (passphrase: String | null) => {
//   return ardorjs.secretPhraseToAccountId(passphrase);
// };

import axios from 'axios';
import qs from 'qs';

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
        recipient: 'ARDOR-64L4-C4H9-Z9PU-9YKDT',
        message: '{"contract": "EarnExp","params": {"expMsg": "abc"}}',
        feeNQT: 3000000,
        amountNQT: 7000000,
        messageIsPrunable: true,
        publicKey: publicKey,
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
        recipient: 'ARDOR-64L4-C4H9-Z9PU-9YKDT',
        message:
          '{"contract": "EarnExp","params": {"expMsg": "battle", "battleMsg": "' +
          opponent +
          '"}}',
        feeNQT: 3000000,
        amountNQT: 97000000,
        messageIsPrunable: true,
        publicKey: publicKey,
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
