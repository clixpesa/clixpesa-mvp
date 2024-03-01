import { DERIVATION_PATH } from 'dapp/config';
import { Wallet, utils } from 'ethers';
import { encryptDataWToken, decryptDataWtoken, userToken, areAddressesEqual } from 'dapp/utils';
import { isProviderSet, getProvider } from './provider.service';
import { getBalance } from 'dapp/contracts/token.interactions';

export let pendingWallet = null;
export let signer = null;

export function isSignerSet() {
  return !!signer;
}

export function getSigner() {
  if (!signer) {
    throw new Error('Attempting to use signer before initialized');
  }
  return signer;
}

export function setSigner(enPrivateKey) {
  if (!isProviderSet()) {
    throw new Error('Provider not set');
  }
  if (signer) {
    console.warn('Overwriting existing signer'); //replace with degugging logger
  }
  const provider = getProvider();
  const privateKey = decryptDataWtoken(enPrivateKey, userToken);
  signer = new Wallet(privateKey, provider);
  console.log('Signer set', signer.address);
}

export async function generateWallet() {
  const entropy = utils.randomBytes(32);
  const mnemonic = utils.entropyToMnemonic(entropy);
  const wallet = Wallet.fromMnemonic(mnemonic, DERIVATION_PATH);
  pendingWallet = {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic.phrase,
  };
  console.log('Pending wallet set');
}

export async function generateWalletFromMnemonic(mnemonic) {
  const wallet = Wallet.fromMnemonic(mnemonic, DERIVATION_PATH);
  pendingWallet = {
    address: wallet.address,
    privateKey: wallet.privateKey,
    mnemonic: wallet.mnemonic.phrase,
  };
  console.log('Pending wallet set');
}

export function getPendingWallet() {
  const pending = pendingWallet;
  pendingWallet = null; // clear the pending wallet on read
  return pending;
}

export function encryptWallet(token) {
  if (!pendingWallet) {
    throw new Error('Pending wallet not initialized');
  }
  console.log('Encrypting wallet');
  const wallet = getPendingWallet();
  const enPrivateKey = encryptDataWToken(wallet.privateKey, token);
  const enMnemomic = encryptDataWToken(wallet.mnemonic, token);
  return {
    address: wallet.address,
    enPrivateKey,
    enMnemomic,
  };
}

//Fetch Balances
export async function getWalletBalances(isSignered, addr) {
  if (!addr && !isSignered) {
    return null;
  }
  const provider = getProvider();
  const balance = await provider.getBalance(addr);
  const celoBal = utils.formatUnits(balance, 18);
  const cusdBal = await getBalance(addr, provider);
  return {
    celoBal: Number(celoBal),
    cusdBal: Number(cusdBal),
  };
}

//Fetch Transactions
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
