import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import cateringReducer from '../features/catering/cateringSlice'
import homeReducer from '../features/homepage/homeSlice'
import occasionReducer from '../features/catering/occasionSlice'
import faqSliceReducer from '../features/catering/cateringFaq'


export const store = configureStore({
  reducer: {
    catering: cateringReducer,
    users: userReducer,
    homepage: homeReducer,
    occasion: occasionReducer,
    faq: faqSliceReducer
  },
})