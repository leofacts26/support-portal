import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/cuisine/userSlice'
import cateringReducer from '../features/cuisine/cateringSlice'


export const store = configureStore({
  reducer: {
    catering: cateringReducer,
    users: userReducer,
  },
})