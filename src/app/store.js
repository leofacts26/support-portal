import { configureStore } from '@reduxjs/toolkit'
import cuisineReducer from '../features/cuisine/cuisineSlice'
import userReducer from '../features/cuisine/userSlice'


export const store = configureStore({
  reducer: {
    cuisine: cuisineReducer,
    users: userReducer,
  },
})