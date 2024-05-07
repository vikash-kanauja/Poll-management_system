import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const loginUser = createAsyncThunk(

  "auth/loginUser",
  async (formData, thunkAPI) => {
    console.log(process.env.REACT_APP_BASE_URL);
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/v1/admin/admin_login`, 
        formData
      );
      localStorage.setItem("user", JSON.stringify(response?.data.user));
      localStorage.setItem("token", JSON.stringify(response?.data.token));
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.status,"IN CATCH");
      return thunkAPI.rejectWithValue(error.response.status);
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
      localStorage.clear()
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
        console.log(action,"Action");
        // in video state.user = null 14.
        // if(action.error.message === "Request faild with status code 401"){
        //   state.errors = "Acess Denied! Invalid Credential";
        // }else{
        //   state.errors   = action.error.message
        // }
        console.log(action.payload,"action.payload...................");
        state.errors = action.payload;
      });
  },
});

// Export the reducer
export default authSlice.reducer;

// Destructure and export individual actions
export const { logout } = authSlice.actions;