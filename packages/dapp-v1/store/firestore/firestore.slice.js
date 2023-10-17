import { createAction, createSlice } from '@reduxjs/toolkit';

const firestoreInitialState = {
  isInitialized: false,
  isInitializing: false,
};

const firestoreSlice = createSlice({
  name: 'firestore',
  initialState: firestoreInitialState,
  reducers: {
    setFirestoreInitialized: (state, action) => {
      state.isInitialized = action.payload;
    },
    setFirestoreInitializing: (state, action) => {
      state.isInitializing = action.payload;
    },
  },
});

export const { setFirestoreInitialized, setFirestoreInitializing } = firestoreSlice.actions;

//Created action
export const addWallet = createAction('firestore/addWallet');
export const updateWallet = createAction('firestore/updateWallet');
export const addUser = createAction('firestore/addUser');
export const updateUser = createAction('firestore/updateUser');

export default firestoreSlice.reducer;
