import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, BASE_URL } from '../api/apiConfig';
import { datavalidationerror } from '../utils';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: true,
  broadcastNotificationList: [],
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


export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
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
  }
})

// Action creators are generated for each case reducer function
export const { } = notificationSlice.actions

export default notificationSlice.reducer