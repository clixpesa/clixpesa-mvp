import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userDetails: null,
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUserDetails(state, { payload }) {
      const { userNames, ctryCode, phoneNo } = payload;
      state.userDetails.names = userNames;
      state.userDetails.phoneNo = ctryCode + phoneNo;

      const country = { '+254': 'Kenya', '+255': 'Tanzania', '+256': 'Uganda' };
      state.userDetails.country = country[ctryCode];

      const names = userNames.split(' ');
      state.userDetails.initials = names[0].slice(0, 1) + names[1].slice(0, 1);
    },
    setUserToken(state, action) {
      state.userDetails.token = action.payload;
    },
    resetUserDetails: () => initialState,
  },
});

export const { setUserDetails, setUserToken, resetUserDetails } = accountSlice.actions;

export default accountSlice.reducer;
