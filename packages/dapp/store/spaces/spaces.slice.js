import { createSlice } from '@reduxjs/toolkit';

const INITIAL_STATE = {
  isLoading: true,
  spaceInfo: {
    spaceName: null,
    spaceId: null,
    spaceType: 'Personal', // 'personal' 'regular' 'rosca'
    goalAmount: null,
    ctbAmount: null,
    ctbDeadline: null,
    ctbDay: 'Monday',
    ctbOccurrence: 'Weekly',
    disbDay: 'Tuesday',
    disbOccurrence: 'Weekly',
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
  },
});

export const { setSpaceInfo, setGoalAmount, setCtbDeadline, setCtbSchedule } = spacesSlice.actions;

export default spacesSlice.reducer;
