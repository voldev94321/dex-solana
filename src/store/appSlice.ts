import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface AppState {
  tokenList: any,
}

// Initial state
const initialState: AppState = {
  tokenList: []
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setTokenList : (state, action: PayloadAction<any>) => {
      state.tokenList = action.payload;
    },
  },
});

export const { setTokenList } = appSlice.actions;
export const appReducer = appSlice.reducer;
