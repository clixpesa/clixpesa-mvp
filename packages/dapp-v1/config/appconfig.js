import { CSAPI_KEY } from 'app-env';

module.exports = {
  jsonRpcUrlPrimary: 'https://alfajores-forno.celo-testnet.org',
  jsonRpcUrlSecondary: 'https://celo-alfajores-testnet.rpc.thirdweb.com',
  blockscoutApiUrl: 'https://api-alfajores.celoscan.io/api',
  blockscoutUrl: 'https://alfajores.celoscan.io',
  blockscoutKey: CSAPI_KEY,
  stableToken: '0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1',
  chainData: {
    name: 'alfajores',
    chainId: 44787,
  },
};
