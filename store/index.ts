// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cardReducer from "./slices/cardSlice";
import characterReducer from "./slices/characterSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    card: cardReducer,
    character: characterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
