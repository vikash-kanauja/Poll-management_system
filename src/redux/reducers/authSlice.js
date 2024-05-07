import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const loginUser = createAsyncThunk(

  "auth/loginUser",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login`, 
        formData
      );
      localStorage.setItem("user", JSON.stringify(response?.data.user));
      localStorage.setItem("token", JSON.stringify(response?.data.token));
      return response;

    } catch (error) {
      return error.response;
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    loading: false,
    err: null,
  },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.err = null;
      localStorage.clear()
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.err = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.loading = false;
        state.err = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.err = action.payload;
      });
  },
});


export default authSlice.reducer;

export const { logout } = authSlice.actions;