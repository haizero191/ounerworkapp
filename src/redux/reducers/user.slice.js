import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { USER_ACTION_LOGIN } from '../actions/user.action';






const userSlice = createSlice({
    name: 'users',
    initialState: {
        data: null,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(USER_ACTION_LOGIN.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(USER_ACTION_LOGIN.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(USER_ACTION_LOGIN.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });

        
    },
});

export default userSlice.reducer