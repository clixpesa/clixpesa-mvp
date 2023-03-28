import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { AFRICASTALKINGKEY } from 'app-env';

export const africasTalkingApi = createApi({
  reducerPath: 'africasTalkingApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.sandbox.africastalking.com/version1' }),
  endpoints: (builder) => ({
    sendCode: builder.mutation({
      query: (payload) => ({
        url: '/messaging',
        method: POST,
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          apikey: AFRICASTALKINGKEY,
        },
      }),
    }),
  }),
});

export const { useSendCodeMutation } = africasTalkingApi;
