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

export const createOrSignupUser = createAsyncThunk(
  "auth/createUser",
  async (userData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    try {
      const url = `${process.env.REACT_APP_BASE_URL}/user/${user? "create":"register"}`
      const response = await axios.post(
        url,
        userData
      );
      return response.data;
    } catch (error) {
      throw new Error(error.message);
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
      localStorage.removeItem("VotedPollsOptions");

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
        state.user = action.payload?.data.user;
        state.loading = false;
        state.err = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.err = action.payload;
      })
      .addCase(createOrSignupUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrSignupUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createOrSignupUser.rejected, (state) => {
        state.loading = false;
      });
  },
});


export default authSlice.reducer;
export const { logout, getUser } = authSlice.actions;