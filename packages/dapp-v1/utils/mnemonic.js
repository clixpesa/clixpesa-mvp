import { utils } from 'ethers';
import { MNEMONIC_LENGTH_MAX, MNEMONIC_LENGTH_MIN } from 'dapp/config/constants';

export function isValidMnemonic(mnemonic) {
  if (!mnemonic) return false;
  const formatted = normalizeMnemonic(mnemonic);
  const split = formatted.split(' ');
  return (
    utils.isValidMnemonic(formatted) &&
    split.length >= MNEMONIC_LENGTH_MIN &&
    split.length <= MNEMONIC_LENGTH_MAX
  );
}

export function isValidDerivationPath(derivationPath) {
  if (!derivationPath) return false;
  const split = derivationPath.trim().split('/');
  // TODO validate each path segment individually here
  return split[0] === 'm' && split.length === 6;
}

export function isValidMnemonicLocale(locale) {
  if (!locale) return false;
  // Only english locales are currently supported
  if (locale !== 'en') return false;
  return true;
}

// Format the mnemonic to handle extra whitespace
// May need more additions here as other languages are supported
export function normalizeMnemonic(mnemonic) {
  if (!mnemonic) return '';
  // Trim and replace all whitespaces with a single space
  return mnemonic.trim().replace(/\s+/gm, ' ');
}
