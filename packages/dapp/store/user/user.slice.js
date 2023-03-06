import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  isLoggedIn: false,
  isConnected: false,
  isSignerSet: false,
  isImporting: false,
  currentUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: INITIAL_STATE,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setCurrentUser(state, action) {
      state.currentUser.names = action.payload.userNames;
      state.currentUser.phoneNo = action.payload.phoneNumber;

      const country = { '+254': 'Kenya', '+255': 'Tanzania', '+256': 'Uganda' };
      state.currentUser.country = country[action.payload.countryCode];

      const names = userNames.split(' ');
      state.currentUser.initials = names[0].slice(0, 1) + names[1].slice(0, 1);
    },
    setUserToken(state, action) {
      state.currentUser.token = action.payload;
    },
    setIsConnected(state, action) {
      state.isConnected = action.payload;
    },
    setIsImporting(state, action) {
      state.isImporting = action.payload;
    },
    setIsSignerSet(state, action) {
      state.isSignerSet = action.payload;
    },
  },
});

export const {
  setIsLoggedIn,
  setCurrentUser,
  setUserToken,
  setIsConnected,
  setIsImporting,
  setIsSignerSet,
} = userSlice.actions;

export default userSlice.reducer;
