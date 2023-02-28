import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    reduxGetBoardList: (state, action) => {
      state.boards = action.payload;
    },
  },
});

export const { reduxGetBoardList } = boardSlice.actions;
export default boardSlice.reducer;
