import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(

  "auth/loginUser",
  async (formData) => {
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

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (formData) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user/register`,
        formData
      );
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
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    getUser: (state) => {
      state.user = JSON.parse(localStorage.getItem("user")) || null;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.err = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
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
        state.user = action.payload.data.user;
        state.loading = false;
        state.err = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.err = action.payload;
      })
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state) => {
        state.loading = false;
      })
  },
});


export default authSlice.reducer;
export const { logout,getUser } = authSlice.actions;