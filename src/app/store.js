import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/cuisine/userSlice'
import cateringReducer from '../features/cuisine/cateringSlice'
import homeReducer from '../features/homepage/homeSlice'




export const store = configureStore({
  reducer: {
    catering: cateringReducer,
    users: userReducer,
    homepage: homeReducer,
  },
})