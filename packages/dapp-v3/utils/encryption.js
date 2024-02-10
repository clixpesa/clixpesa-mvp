import Crypto from 'crypto-js';
//import * as Crypto from 'expo-crypto'
//import { SALT } from 'dapp/config/constants';
import * as SecureStore from 'expo-secure-store'; 

const SALT = '20f22f6c1144ae240b6fab1a84d91a4e9019a11b05d4ac18fa19b01435849496';

export async function encryptData(data, passcode) {
  const saltedPasscode = saltyPasscode(passcode);
  return Crypto.AES.encrypt(data, saltedPasscode).toString();
}

export async function decryptDataWpasscode(encryptedData, passcode) {
  const saltedPasscode = saltyPasscode(passcode);
  const bytes = Crypto.AES.decrypt(encryptedData.toString(), saltedPasscode);
  return bytes.toString(Crypto.enc.Utf8);
}

export async function decryptDataWtoken(encryptedData, token) {
  const bytes = Crypto.AES.decrypt(encryptedData.toString(), token);
  return bytes.toString(Crypto.enc.Utf8);
}

export function saltyPasscode(passcode) {
  return Crypto.PBKDF2(passcode, SALT, { keySize: 8 }).toString();
}