import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, BASE_URL } from '../api/apiConfig';
import { datavalidationerror } from '../utils';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: true,
  broadcastNotificationList: [],
  userNotificationList: [],
  vendorNotificationList: [],
}


export const fetchBroadcastNotificationData = createAsyncThunk(
  'user/fetchBroadcastNotificationData',
  async (user, thunkAPI) => {
    try {
      const response = await api.get(`${BASE_URL}/admin-list-broadcast-notifications?current_page=1&limit=1000`);
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)

export const fetchUserNotificationData = createAsyncThunk(
  'user/fetchUserNotificationData',
  async (user, thunkAPI) => {
    try {
      const response = await api.get(`${BASE_URL}/admin-list-user-notifications?current_page=1&limit=1000`);
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)


export const fetchVendorNotificationData = createAsyncThunk(
  'user/fetchVendorNotificationData',
  async (user, thunkAPI) => {
    try {
      const response = await api.get(`${BASE_URL}/admin-list-vendor-notifications?current_page=1&limit=10`);
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)


export const createBroadbandSubscription = createAsyncThunk(
  'user/createBroadbandSubscription',
  async (data, thunkAPI) => {
    // const { title, message } = data;
    try {
      const response = await api.post(`${BASE_URL}/admin-create-broadcast-notification`, data);
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)


export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      // fetchBroadcastNotificationData 
      .addCase(fetchBroadcastNotificationData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBroadcastNotificationData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.broadcastNotificationList = payload;
      })
      .addCase(fetchBroadcastNotificationData.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // fetchUserNotificationData 
      .addCase(fetchUserNotificationData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserNotificationData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.userNotificationList = payload;
      })
      .addCase(fetchUserNotificationData.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // fetchVendorNotificationData 
      .addCase(fetchVendorNotificationData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVendorNotificationData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.vendorNotificationList = payload;
      })
      .addCase(fetchVendorNotificationData.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // createBroadbandSubscription 
      .addCase(createBroadbandSubscription.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBroadbandSubscription.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(createBroadbandSubscription.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
  }
})

// Action creators are generated for each case reducer function
export const { } = notificationSlice.actions

export default notificationSlice.reducer