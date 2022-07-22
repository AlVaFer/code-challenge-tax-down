import { configureStore } from "@reduxjs/toolkit";
import taxesReducer from "./taxesSlice";

export const store = configureStore({
  reducer: {
    taxes: taxesReducer,
  },
});
