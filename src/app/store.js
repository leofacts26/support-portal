import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/userSlice'
import cateringReducer from '../features/catering/cateringSlice'
import homeReducer from '../features/homepage/homeSlice'
import occasionReducer from '../features/catering/occasionSlice'
import faqSliceReducer from '../features/catering/cateringFaq'
import priceReducer from '../features/catering/priceSlice'
import mealReducer from '../features/catering/mealSlice'
import kitchenReducer from '../features/catering/kitchenSlice'
import couponReducer from '../features/catering/couponSlice'
import subscriptionReducer from '../features/subscriptionSlice'
import notificationReducer from '../features/notificationSlice'
import authReducer from '../features/authSlice'
import footerReduce from '../features/footerSlice'
import adminRoleReducer from '../features/adminRoleSlice'


export const store = configureStore({
  reducer: {
    catering: cateringReducer,
    users: userReducer,
    homepage: homeReducer,
    occasion: occasionReducer,
    faq: faqSliceReducer,
    priceranges: priceReducer,
    mealtypes: mealReducer,
    kitchentypes: kitchenReducer,
    coupons: couponReducer,
    subscription: subscriptionReducer,
    notifications: notificationReducer,
    authSlice: authReducer,
    footerSlice: footerReduce,
    roleSlice: adminRoleReducer
  },
})