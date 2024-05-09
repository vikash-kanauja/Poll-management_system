import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import axiosInterceptor from '../../utils/axiosInterceptor';
export const fetchRoles = createAsyncThunk(
    'roles/fetchRoles',
    async () => {
        const headers = {
            "ngrok-skip-browser-warning": "69420"
          };
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/role/list`,
            { headers:headers}
        );
        return response;
    }
);

const rolesSlice = createSlice({
    name: 'roles',
    initialState: {
        role: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers:(builder)=> {
        builder
        .addCase(fetchRoles.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchRoles.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.role = action.payload;
        })
        .addCase(fetchRoles.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
    },
});

export default rolesSlice.reducer;
axiosInterceptor()

