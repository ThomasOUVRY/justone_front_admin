import { configureStore } from "@reduxjs/toolkit";

import justOneRoundReducer from "./justOneRound.slice.ts";
import justOneGameReducer from "./justOneGame.slice.ts";

export const store = configureStore({
  reducer: {
    justOneGame: justOneGameReducer,
    justOneRound: justOneRoundReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
