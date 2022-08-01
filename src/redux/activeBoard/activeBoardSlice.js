import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ROOT } from "utilities/constants";
import { mapOrder } from "utilities/sorts";

const initialState = {
  currentFullBoard: null,
};

export const fetchFullBoardDetailsAPI = createAsyncThunk(
  "activeBoard/fetchBoardDetailsAPI",
  async (boardId) => {
    const request = await axios.get(`${API_ROOT}/v1/boards/${boardId}`);
    return request.data;
  }
);

export const activeBoardSlice = createSlice({
  name: "activeBoard",
  initialState,
  reducers: {
    updateCurrentFullBoard: (state, action) => {
      state.currentFullBoard = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFullBoardDetailsAPI.fulfilled, (state, action) => {
      let fullBoard = action.payload;

      fullBoard.columns = mapOrder(
        fullBoard.columns,
        fullBoard.columnOrder,
        "_id"
      );
      fullBoard.columns.forEach((c) => {
        c.cards = mapOrder(c.cards, c.cardOrder, "_id");
      });

      state.currentFullBoard = fullBoard;
    });
  },
});

export const { updateCurrentFullBoard } = activeBoardSlice.actions;

// selector
export const selectCurrentFullBoard = (state) => {
  return state.activeBoard.currentFullBoard;
};

export default activeBoardSlice.reducer;
