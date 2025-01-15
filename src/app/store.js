import { configureStore } from '@reduxjs/toolkit'
import supportTicketReducer from '../features/supportTicketSlice'
import authSliceReducer from '../features/authSlice'
import shareLinksSliceReducer from '../features/shareLinksSlice'
import menuReducer from '../features/menuSlice'
import followUpReducer from '../features/followUpsSlice'
import subscriptionReducer from '../features/subscriptionSlice'


export const store = configureStore({
  reducer: {
    menu: menuReducer,
    supportTickets: supportTicketReducer,
    authSlice: authSliceReducer,
    shareLinks: shareLinksSliceReducer,
    followUps: followUpReducer,
    subscription: subscriptionReducer,
  },
})