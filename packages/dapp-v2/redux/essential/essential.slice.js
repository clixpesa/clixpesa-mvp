import { createSlice, createAction } from '@reduxjs/toolkit';

const initialState = {
  isVerified: false,
  isLoggedIn: false,
  isConnected: false,
  isSignerSet: false,
  isImporting: false,
  isAgreedToTerms: false,
  hasAccount: false,
  userDetails: {
    id: null,
    names: null,
    initials: null,
    email: null,
    phone: '',
    country: null,
    address: null,
    photo: null,
  },
};

const essentialSlice = createSlice({
  name: 'essential',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserDetails: (state, { payload }) => {
      const { userId, userPhone, userNames, userEmail, userName, userPhoto } = payload;
      state.userDetails.id = userId;
      state.userDetails.phone = userPhone;
      const country = { '+254': 'Kenya', '+256': 'Uganda', '+255': 'Tanzania' };
      state.userDetails.country = country[userPhone.slice(0, 4)];
      if (userEmail) state.userDetails.email = userEmail;
      if (userPhoto) state.userDetails.photo = userPhoto;
      if (userName) {
        state.userDetails.names = userNames;
        const twonames = userNames.split(' ');
        state.userDetails.initials = twonames[0].slice(0, 1) + twonames[1].slice(0, 1);
      } else {
        state.userDetails.initials = userPhone.slice(11, 13);
      }
    },
    updateUserDetails: (state, { payload }) => {
      const { names, address, email } = payload;
      state.userDetails.names = names;
      const twonames = names.split(' ');
      state.userDetails.initials = twonames[0].slice(0, 1) + twonames[1].slice(0, 1);
      if (email) state.userDetails.email = email;
      if (address) state.userDetails.address = address;
    },
    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    setHasAccount: (state, action) => {
      state.hasAccount = action.payload;
    },
    setIsImporting: (state, action) => {
      state.status.isImporting = action.payload;
    },
    setIsSignered: (state, action) => {
      state.isSignerSet = action.payload;
    },
    setIsVerified: (state, action) => {
      state.isVerified = action.payload;
    },
    setAgreedToTerms: (state, action) => {
      state.isAgreedToTerms = action.payload;
    },
    resetUserDetails: () => initialState,
  },
});

export const {
  setLoggedIn,
  setIsConnected,
  setIsSignered,
  setHasAccount,
  setIsImporting,
  setUserDetails,
  updateUserDetails,
  setIsVerified,
  setAgreedToTerms,
  resetUserDetails,
} = essentialSlice.actions;

export const createAccount = createAction('essential/createAccount');
export const importAccount = createAction('essential/importAccount');

export default essentialSlice.reducer;
