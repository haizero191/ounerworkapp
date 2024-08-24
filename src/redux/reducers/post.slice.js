import axios from 'axios';


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { POST_ACTION_GETALL } from "../actions/post.action";
import APIs, { endpoints } from '../../configs/APIs';






const postSlice = createSlice({
    name: 'posts',
    initialState: {
        data: null,
        isLoading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(POST_ACTION_GETALL.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(POST_ACTION_GETALL.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(POST_ACTION_GETALL.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default postSlice.reducer