import { DERIVATION_PATH } from 'dapp/config';
import { Wallet, utils } from 'ethers';
import { encryptDataWToken, decryptDataWtoken } from 'dapp/utils';

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
