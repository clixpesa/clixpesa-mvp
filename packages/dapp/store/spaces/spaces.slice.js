import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  isLoading: true,
  spaceInfo: {
    spaceName: null,
    spaceId: null,
    spaceType: 'Personal', // 'personal' 'regular' 'rosca'
    goalAmount: null,
    ctbAmount: 0,
    ctbDeadline: null,
    ctbDay: 'Monday',
    ctbOccurrence: 'Weekly',
    disbDay: 'Tuesday',
    disbOccurrence: 'Weekly',
    totalAmount: null,
  },
};

export const spacesSlice = createSlice({
  name: 'spaces',
  initialState: INITIAL_STATE,
  reducers: {
    setSpaceInfo(state, action) {
      state.spaceInfo.spaceName = action.payload.spaceName;
    },
    setGoalAmount(state, action) {
      state.spaceInfo.goalAmount = action.payload;
    },
    setCtbDeadline(state, action) {
      state.spaceInfo.ctbDeadline = action.payload;
    },
    setCtbSchedule(state, action) {
      state.spaceInfo.ctbDay = action.payload.ctbDay;
      state.spaceInfo.ctbOccurrence = action.payload.ctbOccurrence;
    },
    addFunds(state, action) {
      state.spaceInfo.totalAmount += action.payload;
    },
    withdrawFunds(state, action) {
      state.spaceInfo.totalAmount -= action.payload;
    },
  },
});

export const {
  setSpaceInfo,
  setGoalAmount,
  setCtbDeadline,
  setCtbSchedule,
  addFunds,
  withdrawFunds,
} = spacesSlice.actions;

export default spacesSlice.reducer;
