import { createSlice, createAction } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  hasAccount: {
    state: false,
    address: null,
  },
  userDetails: {
    id: null,
    names: null,
    initials: null,
    email: null,
    phone: null,
    country: null,
    address: null,
    photoURL: null,
  },
};

const essentialSlice = createSlice({
  name: 'essential',
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      const { id, names, email, phone, photoUri, country } = action.payload;
      state.userDetails.id = id;
      state.userDetails.phone = phone;
      state.userDetails.country = country;
      if (email) state.userDetails.email = email;
      if (photoUri) state.userDetails.photoURL = photoUri;
      if (names) {
        state.userDetails.names = names;
        const initials = names
          .split(' ')
          .map((n) => n[0])
          .join('');
        state.userDetails.initials = initials;
      } else {
        state.userDetails.initials = phone.slice(11, 13);
      }
    },
    setUserDetailsOnLogin: (state, action) => {
      state.userDetails = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setHasAccount: (state, action) => {
      state.hasAccount = action.payload;
    },
    updateUserDetails: (state, action) => {
      const { names, address, email } = action.payload;
      if (names) {
        state.userDetails.names = names;
        const initials = names
          .split(' ')
          .map((n) => n[0])
          .join('');
        state.userDetails.initials = initials;
      }
      if (email) state.userDetails.email = email;
      if (address) state.userDetails.address = address;
    },
    clearUserDetails: (state) => {
      state.userDetails = initialState.userDetails;
    },
  },
});

export const {
  setUserDetails,
  setLoggedIn,
  setUserDetailsOnLogin,
  setHasAccount,
  updateUserDetails,
  clearUserDetails,
} = essentialSlice.actions;

export const addUserDetailsToken = createAction('essential/addUserDetailsToken');
export const changeUserToken = createAction('essential/changeUserToken');
export const createPendingWallet = createAction('essential/createPendingWallet');

export default essentialSlice.reducer;
