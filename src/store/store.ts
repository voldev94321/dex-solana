import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./appSlice";

const rootReducer = combineReducers({
  app: appReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});