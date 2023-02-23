import { configureStore } from "@reduxjs/toolkit";

import { catsSlice } from "./cats/cats.slice";
import { RootReducers } from "./root-reducers";
import { userSlice } from "./user/user.slice";

export const store = configureStore({
  reducer: {
    [RootReducers.user]: userSlice,
    [RootReducers.cats]: catsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
