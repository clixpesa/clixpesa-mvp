import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NEWSDATAKEY } from 'app-env';
// Define a service using a base URL and expected endpoints
export const newsdataApi = createApi({
  reducerPath: 'newsdataApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://newsdata.io/api/`,
  }),
  endpoints: (builder) => ({
    //xdc OR usdc news
    getLatestNews: builder.query({
      query: (tag) => `1/news?apikey=${NEWSDATAKEY}&q=${tag}&language=en`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetLatestNewsQuery } = newsdataApi;
