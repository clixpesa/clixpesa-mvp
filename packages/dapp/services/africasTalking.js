import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ATBaseUrl } from '../config';
import { AFRICASTALKINGKEY } from 'app-env';

export const africasTalkingApi = createApi({
  reducerPath: 'africasTalkingApi',
  baseQuery: fetchBaseQuery({ baseUrl: ATBaseUrl }),
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (body) => ({
        url: '/messaging',
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          apiKey: AFRICASTALKINGKEY,
        },
      }),
    }),
  }),
});

export const { useSendMessageMutation } = africasTalkingApi;
