import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

 export const getPolls = createAsyncThunk(
  "poll/getPollList", async (pageNo) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/poll/list/${pageNo}/?limit=4`);
      console.log(response);
      return response;
    } catch (error) {
      return error.response
    }
  }
)

export const pollSlice = createSlice({

  name: "pollList",
  initialState: {
    pollList: [],
    loading: false,
    pollListLength: 0
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPolls.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPolls.fulfilled, (state, action) => {
      state.loading = false;
      state.pollList = action.payload;
      state.pollListLength = action.payload?.length;
    });
    builder.addCase(getPolls.rejected, (state) => {
      state.loading = false;
    });
  }
})

export default pollSlice.reducer;
// export const {getPolls} = pollSlice.actions