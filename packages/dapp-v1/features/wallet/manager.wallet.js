import { DERIVATION_PATH, WALLETS_STORE } from 'dapp/config/constants';
import { getUserWallets, storeUserWallet } from 'dapp/services';
import { encryptData, areAddressesEqual } from 'dapp/utils';
import { Wallet, utils } from 'ethers';
import { getProvider } from 'dapp/config/provider';
import { getTokenBalance } from 'dapp/contracts';

export const walletsListCache = {};

export async function hasWallets() {
  const result = await getWallets();
  return result.length !== 0;
}

export async function getDefaultNewWalletName() {
  const list = await getWallets();
  return `Wallet ${list.length + 1}`;
}

export async function getWallets() {
  if (Object.keys(walletsListCache).length <= 0) {
    const storedWallets = await getUserWallets(WALLETS_STORE);
    if (Object.values(storedWallets).length > 0) {
      for (const wallet of Array.from(storedWallets)) {
        Object.assign(walletsListCache, { [wallet.address]: wallet });
      }
    }
  }
  return Object.values(walletsListCache); //Always return a list
}

export async function generateWallet(derivationPath) {
  const path = derivationPath || DERIVATION_PATH;
  const entropy = utils.randomBytes(32);
  const mnemonic = utils.entropyToMnemonic(entropy);
  const wallet = Wallet.fromMnemonic(mnemonic, path);
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic.phrase,
  };
}

export async function generateWalletFromMnemonic(mnemonic, derivationPath) {
  const path = derivationPath || DERIVATION_PATH;
  const wallet = Wallet.fromMnemonic(mnemonic, path);
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic.phrase,
  };
}

export async function storeWallet(passcode, wallet) {
  console.log('Adding wallet to store');
  const enPrivateKey = await encryptData(wallet.privateKey, passcode);
  const enMnemonic = await encryptData(wallet.mnemonic.phrase, passcode);
  const walletName = await getDefaultNewWalletName();
  const newWallet = {
    walletName: walletName,
    address: wallet.address,
    enPrivateKey: enPrivateKey,
    enMnemonic: enMnemonic,
  };
  await storeUserWallet(WALLETS_STORE, newWallet);

  Object.assign(walletsListCache, { [wallet.address]: newWallet });
}

export async function getWalletBalances(isSignered, addr) {
  if (!addr && !isSignered) {
    return null;
  }
  const provider = getProvider();
  const balance = await provider.getBalance(addr);
  const celoBal = utils.formatUnits(balance, 18);
  const cusdBal = await getTokenBalance(addr);
  return {
    celoBal: Number(celoBal),
    cusdBal: Number(cusdBal),
  };
}

export function getWalletTxs(accountTxs, erc20Txs, address) {
  if (!accountTxs || !erc20Txs) return [];
  const txs = accountTxs.result.filter((tx) => tx.value !== '0');
  const thisTxs = txs.map((tx) => {
    const txDate = new Date(tx.timeStamp * 1000);
    const date = txDate.toDateString().split(' ');
    return {
      id: tx.hash,
      title: areAddressesEqual(tx.to, address) ? 'Received CELO' : 'Transfered CELO',
      date: date[0] + ', ' + date[2] + ' ' + date[1] + ', ' + txDate.toTimeString().slice(0, 5),
      token: 'CELO',
      amount: utils.formatUnits(tx.value, 18).toString(),
      to: tx.to,
      from: tx.from,
      fee: utils.formatUnits(tx.gasPrice * tx.gasUsed, 18).toString(),
      credited: areAddressesEqual(tx.to, address),
      timestamp: txDate.getTime(),
    };
  });

  const ercTxs = erc20Txs.result.filter((tx) => Number(tx.value) >= 1000000000000000);
  const thisErc20Txs = ercTxs.map((tx) => {
    const txDate = new Date(tx.timeStamp * 1000);
    const date = txDate.toDateString().split(' ');
    return {
      id: tx.hash,
      title: areAddressesEqual(tx.to, address) ? 'Received CUSD' : 'Transfered CUSD',
      date: date[0] + ', ' + date[2] + ' ' + date[1] + ', ' + txDate.toTimeString().slice(0, 5),
      token: tx.tokenSymbol,
      amount: utils.formatUnits(tx.value, tx.tokenDecimal).toString(),
      to: tx.to,
      from: tx.from,
      fee: utils.formatUnits(tx.gasPrice * tx.gasUsed, 18).toString(),
      credited: areAddressesEqual(tx.to, address),
      timestamp: txDate.getTime(),
    };
  });

  thisTxs.push(...thisErc20Txs);
  thisTxs.sort((a, b) => Number(b.timestamp) - Number(a.timestamp));
  return thisTxs;
}
