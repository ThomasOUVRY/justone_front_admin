import { createSlice } from "@reduxjs/toolkit";

export type JustOneRoundSlice = {
  roundRemainingDuration: number;
  roundIsEnded: boolean;
};

const justOneRoundSlice = createSlice({
  name: "justOneRound",
  initialState: {
    roundIsEnded: false,
  } as JustOneRoundSlice,
  reducers: {
    addDuration: (state, action: { payload: number }) => {
      state.roundIsEnded = false;
      state.roundRemainingDuration += action.payload;
    },
    updateRemainingDuration: (state, action) => {
      state.roundRemainingDuration = action.payload;
      if (state.roundRemainingDuration <= 0) {
        state.roundIsEnded = true;
      }
    },
    initRound: (state, action: { payload: number }) => {
      state.roundIsEnded = false;
      state.roundRemainingDuration = action.payload;
    },
  },
  selectors: {
    getRoundRemainingDuration: (state): number => state.roundRemainingDuration,
    getJustOneRound: (state): JustOneRoundSlice => state,
    isRoundEnded: (state): boolean => state.roundIsEnded,
  },
});

export const { addDuration, initRound, updateRemainingDuration } =
  justOneRoundSlice.actions;
export const { getRoundRemainingDuration, isRoundEnded, getJustOneRound } =
  justOneRoundSlice.selectors;
export default justOneRoundSlice.reducer;
