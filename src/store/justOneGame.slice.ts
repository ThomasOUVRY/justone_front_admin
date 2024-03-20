import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type JustOneGameSlice = {
  gameCode: string;
  currentRound: number;
  roundDuration: number;
  totalRounds: number;
  gameIsEnded: boolean;
  roundPending: boolean;
};

const justOneGameSlice = createSlice({
  name: "justOneGame",
  initialState: {
    currentRound: 1,
    totalRounds: 10,
  } as JustOneGameSlice,
  reducers: {
    initGame: (
      state,
      action: PayloadAction<{
        gameCode: string;
        roundDuration: number;
        totalRounds: number;
        currentRound: number;
      }>,
    ) => {
      state.gameIsEnded = false;
      state.currentRound = action.payload.currentRound;
      state.roundDuration = action.payload.roundDuration;
      state.totalRounds = action.payload.totalRounds;
      state.gameCode = action.payload.gameCode;
    },
    nextRound: (state) => {
      state.roundPending = false;
      state.currentRound += 1;
      if (state.currentRound > state.totalRounds) {
        state.gameIsEnded = true;
      }
    },
    endGame: (state) => {
      state.gameIsEnded = true;
      state.roundPending = false;
    },
  },
  selectors: {
    getCurrentRound: (state): number => state.currentRound,
    getTotalRounds: (state): number => state.totalRounds,
    getGame: (state): JustOneGameSlice => state,
    isGameEnded: (state): boolean => state.gameIsEnded,
  },
});

export const { endGame, initGame, nextRound } = justOneGameSlice.actions;
export const { isGameEnded, getCurrentRound, getTotalRounds, getGame } =
  justOneGameSlice.selectors;
export default justOneGameSlice.reducer;
