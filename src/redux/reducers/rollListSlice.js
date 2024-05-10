import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
export const fetchRoles = createAsyncThunk(
    'roles/fetchRoles',
    async () => {
        
        const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/role/list`,
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


