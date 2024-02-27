import { saltyPasscode } from './encryption';

export let userToken = null;

export function setUserToken(code) {
  if (userToken) {
    console.warn('Overwriting existing user token'); //replace with degugging logger
  }
  userToken = saltyPasscode(code);
  console.log('Token Set');
}

export function setUserTokenFrom(token) {
  if (userToken) {
    console.warn('Overwriting existing user token'); //replace with degugging logger
  }
  userToken = token;
  console.log('Token Set');
}
