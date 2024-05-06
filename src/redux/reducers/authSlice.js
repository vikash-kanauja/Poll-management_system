import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const loginUser = createAsyncThunk(

  "auth/loginUser",
  async (formData, thunkAPI) => {
    
    try {
      const response = await axios.post(`https://809e-119-82-71-56.ngrok-free.app/user/login`, 
        formData
      );
      localStorage.setItem("user", JSON.stringify(response?.data.user));
      localStorage.setItem("token", JSON.stringify(response?.data.token));
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    loading: false,
    errors: null,
  },
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.errors = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.errors = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.loading = false;
        state.errors = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        // in video state.user = null 14.
        console.log(action.error.message,"action.error.message,");
        if(action.error.message === "Request faild with status code 401"){
          state.errors = "Acess Denied! Invalid Credential";
        }else{
          state.errors   = action.error.message
        }
        state.errors = action.payload;
      });
  },
});

// Export the reducer
export default authSlice.reducer;

// Destructure and export individual actions
export const { logout } = authSlice.actions;