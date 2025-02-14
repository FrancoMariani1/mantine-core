import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://tu-api.com/api/usuarios'; 

export const fetchUserById = createAsyncThunk('user/fetchUser', async (userId) => {
    const response = await axios.get(`${API_URL}/${userId}`);
    return response.data;
    });

const userSlice = createSlice({
    name: 'user',
    initialState: {
        data: null,
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {
        clearUser: (state) => {
            state.data = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
