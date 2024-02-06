import { DERIVATION_PATH } from 'dapp/config/constants';
import { encryptData, areAddressesEqual } from 'dapp/utils';
import { Wallet, utils } from 'ethers';
//import { getProvider } from 'dapp/config/provider';

export const walletsListCache = {};

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

export async function encryptWallet(passcode, wallet) {
  console.log('Encrypting Wallet');
  const enPrivateKey = await encryptData(wallet.privateKey, passcode);
  const enMnemonic = await encryptData(wallet.mnemonic.phrase, passcode);
  const walletName = 'Wallet 1'; //await getDefaultNewWalletName();
  const newWallet = {
    walletName: walletName,
    address: wallet.address,
    enPrivateKey: enPrivateKey,
    enMnemonic: enMnemonic,
  };
  Object.assign(walletsListCache, { [wallet.address]: newWallet });
  return newWallet;
}
