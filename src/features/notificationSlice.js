import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, BASE_URL } from '../api/apiConfig';
import { datavalidationerror, successToast } from '../utils';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: true,
  broadcastNotificationList: [],
  userNotificationList: [],
  vendorNotificationList: [],
  caterSubscriptionTypes: [],
  tiffinSubscriptionTypes: [],
}


export const fetchSubscriptionTypesCaterer = createAsyncThunk(
  'user/fetchSubscriptionTypesCaterer',
  async (data, thunkAPI) => {
    console.log(data, "data ttttttttt");
    try {
      const response = await api.get(`${BASE_URL}/rz-list-subscription-types-by-vendor-type?vendor_type=Caterer&limit=1000&page=1`);
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)

export const fetchSubscriptionTypesTiffin = createAsyncThunk(
  'user/fetchSubscriptionTypesTiffin',
  async (user, thunkAPI) => {
    try {
      const response = await api.get(`${BASE_URL}/rz-list-subscription-types-by-vendor-type?vendor_type=Tiffin&limit=1000&page=1`);
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)

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


export const createBroadbandNotification = createAsyncThunk(
  'user/createBroadbandNotification',
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

export const createUserNotification = createAsyncThunk(
  'user/createUserNotification',
  async (data, thunkAPI) => {
    // const { title, message } = data;
    try {
      const response = await api.post(`${BASE_URL}/admin-create-user-notification`, data);
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)


export const createVendorSubscription = createAsyncThunk(
  'user/createVendorSubscription',
  async (data, thunkAPI) => {
    // const { title, message } = data;
    try {
      const response = await api.post(`${BASE_URL}/admin-create-vendor-notification`, data);
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
      // createBroadbandNotification 
      .addCase(createBroadbandNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBroadbandNotification.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(createBroadbandNotification.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // createUserNotification 
      .addCase(createUserNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createUserNotification.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success(successToast(payload));
      })
      .addCase(createUserNotification.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // createVendorSubscription 
      .addCase(createVendorSubscription.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createVendorSubscription.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        toast.success(successToast(payload));
      })
      .addCase(createVendorSubscription.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // fetchSubscriptionTypesCaterer 
      .addCase(fetchSubscriptionTypesCaterer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSubscriptionTypesCaterer.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.caterSubscriptionTypes = payload;
      })
      .addCase(fetchSubscriptionTypesCaterer.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // fetchSubscriptionTypesTiffin 
      .addCase(fetchSubscriptionTypesTiffin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSubscriptionTypesTiffin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.tiffinSubscriptionTypes = payload;
      })
      .addCase(fetchSubscriptionTypesTiffin.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
  }
})

// Action creators are generated for each case reducer function
export const { } = notificationSlice.actions

export default notificationSlice.reducer