import { configureStore } from '@reduxjs/toolkit'
import postSlice from './reducers/post.slice'
import userSlice from './reducers/user.slice'
import profileSlice from './reducers/profile.slice'

export default configureStore({
  reducer: {
    posts: postSlice, 
    user: userSlice.reducer,
    profile: profileSlice
  },
})