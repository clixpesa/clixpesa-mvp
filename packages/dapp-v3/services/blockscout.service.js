import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { blockscoutApiUrl, blockscoutKey, stableToken } from 'dapp/config/appconfig';
// Define a service using a base URL and expected endpoints
export const blockscoutApi = createApi({
  reducerPath: 'blockscoutApi',
  baseQuery: fetchBaseQuery({ baseUrl: blockscoutApiUrl }),
  endpoints: (builder) => ({
    //Account
    getTxsByAddr: builder.query({
      query: (addr) =>
        `?module=account&action=txlist&address=${addr}&startblock=14000000&endblock=99999999&page=1&offset=10&sort=desc&apiKey=${blockscoutKey}`,
    }),
    getTokenTxs: builder.query({
      query: (addr) =>
        `?module=account&action=tokentx&contractaddress=${stableToken}&address=${addr}&page=1&offset=10&startblock=14000000&endblock=99999999&sort=desc&apiKey=${blockscoutKey}`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTxsByAddrQuery, useGetTokenTxsQuery } = blockscoutApi;
