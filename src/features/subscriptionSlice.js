import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, BASE_URL } from '../api/apiConfig';
import { datavalidationerror } from '../utils';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: true,
  subscriptionList: [],
  razorpayPlansMapperList: [],
  vendorSubscriptionEvents: [],
  vendorSubscriptionList: [],
}


export const fetchSubscriptionData = createAsyncThunk(
  'user/fetchSubscriptionData',
  async (user, thunkAPI) => {
    try {
      const response = await api.get(`${BASE_URL}/admin-list-vendor-subscriptions`);
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)


export const fetchRazorpayPlansMapper = createAsyncThunk(
  'user/fetchRazorpayPlansMapper',
  async (user, thunkAPI) => {
    try {
      const response = await api.get(`${BASE_URL}/admin-list-razorpay-plans-mapper?limit=1000&current_page=1`);
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)


export const fetchVendorSubscriptionEvents = createAsyncThunk(
  'user/fetchVendorSubscriptionEvents',
  async (user, thunkAPI) => {
    try {
      const response = await api.get(`${BASE_URL}/admin-list-vendor-subscription-events?limit=1000&page=1`);
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)

export const fetchVendorSubscriptionList = createAsyncThunk(
  'user/fetchSubscriptionList',
  async (user, thunkAPI) => {
    try {
      const response = await api.get(`${BASE_URL}/rz-list-subscription-types-by-vendor-type?vendor_type=Caterer&limit=100&page=1`);
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)


export const createSubscriptionData = createAsyncThunk(
  'user/createSubscriptionData',
  async (data, thunkAPI) => {
    try {
      const response = await api.post(`${BASE_URL}/admin-create-subscription-type`, data);
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)


export const updateSubscriptionData = createAsyncThunk(
  'user/updateSubscriptionData',
  async (data, thunkAPI) => {
    try {
      const response = await api.post(`${BASE_URL}/admin-update-subscription-type`, data);
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)




export const subscriptionSlice = createSlice({
  name: 'subscription',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubscriptionData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSubscriptionData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.subscriptionList = payload;
      })
      .addCase(fetchSubscriptionData.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // fetchRazorpayPlansMapper 
      .addCase(fetchRazorpayPlansMapper.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRazorpayPlansMapper.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.razorpayPlansMapperList = payload;
      })
      .addCase(fetchRazorpayPlansMapper.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // fetchVendorSubscriptionEvents 
      .addCase(fetchVendorSubscriptionEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVendorSubscriptionEvents.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.vendorSubscriptionEvents = payload;
      })
      .addCase(fetchVendorSubscriptionEvents.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // fetchVendorSubscriptionList 
      .addCase(fetchVendorSubscriptionList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVendorSubscriptionList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.vendorSubscriptionList = payload;
      })
      .addCase(fetchVendorSubscriptionList.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
  }
})

// Action creators are generated for each case reducer function
export const { } = subscriptionSlice.actions

export default subscriptionSlice.reducer