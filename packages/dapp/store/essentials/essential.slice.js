import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  isConnected: false,
  isSignerSet: false,
  isImporting: false,
};

export const essentialSlice = createSlice({
  name: 'essential',
  initialState,
  reducers: {
    setIsLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
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

export const { setIsLoggedIn, setIsConnected, setIsImporting, setIsSignerSet } =
  essentialSlice.actions;

export default essentialSlice.reducer;
