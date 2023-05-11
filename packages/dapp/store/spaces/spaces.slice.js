import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  isLoading: true,
  personalSpace: {
    name: null,
    id: null,
    goalAmount: null,
    ctbAmount: 0,
    ctbDeadline: null,
    ctbDay: 'Monday',
    ctbOccurrence: 'Weekly',
    disbDay: 'Tuesday',
    disbOccurrence: 'Weekly',
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
      state.personalSpace.name = action.payload.spaceName;
    },
    setGoalAmount(state, action) {
      state.personalSpace.goalAmount = action.payload;
    },
    setCtbDeadline(state, action) {
      state.personalSpace.ctbDeadline = action.payload;
    },
    setCtbSchedule(state, action) {
      state.personalSpace.ctbDay = action.payload.ctbDay;
      state.personalSpace.ctbOccurrence = action.payload.ctbOccurrence;
    },
    addRecurringTransfer(state, action) {
      state.personalSpace.ctbAmount += action.payload;
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
  setCtbDeadline,
  setCtbSchedule,
  addRecurringTransfer,
  addFunds,
  withdrawFunds,
} = spacesSlice.actions;

export default spacesSlice.reducer;
