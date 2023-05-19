import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  isLoading: true,
  personalSpace: {
    name: null,
    id: null,
    goalAmount: null,
    ctbAmount: 0,
    deadline: null,
    totalAmount: 0,
    recurringTransfer: 0,
    spareChange: 0,
  },
};

export const spacesSlice = createSlice({
  name: 'spaces',
  initialState: INITIAL_STATE,
  reducers: {
    setSpaceName(state, action) {
      state.personalSpace.name = action.payload;
    },
    setGoalAmount(state, action) {
      state.personalSpace.goalAmount = action.payload;
    },
    setGoalDeadline(state, action) {
      state.personalSpace.deadline = action.payload;
    },
    addRecurringTransfer(state, action) {
      state.personalSpace.recurringTransfer = action.payload;
    },
    addFunds(state, action) {
      state.personalSpace.totalAmount += action.payload;
    },
    withdrawFunds(state, action) {
      state.personalSpace.totalAmount -= action.payload;
    },
  },
});

export const {
  setSpaceName,
  setGoalAmount,
  setGoalDeadline,
  addRecurringTransfer,
  addFunds,
  withdrawFunds,
} = spacesSlice.actions;

export default spacesSlice.reducer;
