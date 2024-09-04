import axios from 'axios';


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { POST_ACTION_GETALL, POST_ACTION_CREATE, POST_ACTION_REACTION } from "../actions/post.action";
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

            // HANDLE GET ALL POST REQUEST
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
            })

            // HANDLE POST CREATE REQUEST            
            .addCase(POST_ACTION_CREATE.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(POST_ACTION_CREATE.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = [action.payload, ...state.data];
    
            })
            .addCase(POST_ACTION_CREATE.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            })

            // HANDLE USER REACTION POST REQUEST 
            .addCase(POST_ACTION_REACTION.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(POST_ACTION_REACTION.fulfilled, (state, action) => {
                state.isLoading = false;
                const index = state.data.findIndex(post => post.id === action.payload.postId);

                console.log(action.payload)
         
                
                // Handle reaction status
                if(action.payload.status === "REACTION") {
                    state.data[index].isUserInteracted = true;
                    state.data[index].reactionNumber += 1;
                    
                }
                else if (action.payload.status === "UNREACTION") {
                    state.data[index].isUserInteracted = false;
                    state.data[index].reactionNumber -= 1;
 
                }
                else if (action.payload.status === "UPDATEREACTION") {
                    state.data[index].isUserInteracted = true;
                    
                }
            })
            .addCase(POST_ACTION_REACTION.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default postSlice.reducer