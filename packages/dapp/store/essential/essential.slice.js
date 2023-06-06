import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  isConnected: false,
  isSignerSet: false,
  isImporting: false,
  userToken: null,
  status: {
    isLoading: false,
    isSuccess: false,
    isFailed: false,
  },
};

const essentialSlice = createSlice({
  name: 'essential',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setToken: (state, action) => {
      state.userToken = action.payload;
    },
    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    setIsImporting: (state, action) => {
      state.status.isImporting = action.payload;
    },
    setIsSignered: (state, action) => {
      state.isSignerSet = action.payload;
    },
    resetEssentials: () => initialState,
  },
});

export const {
  setLoggedIn,
  setToken,
  setIsConnected,
  setIsImporting,
  setIsSignered,
  resetEssentials,
} = essentialSlice.actions;

export default essentialSlice.reducer;
