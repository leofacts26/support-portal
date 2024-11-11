import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, BASE_URL } from '../api/apiConfig';
import { datavalidationerror, successToast } from '../utils';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: true,
  supportTicketList: []
}


export const fetchSupportTicketData = createAsyncThunk(
  'supportTickets/fetchSupportTicketData',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.get(`${BASE_URL}/support-list-tickets?current_page=1&limit=3000`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response, "response");

      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)

export const createSupportTicketData = createAsyncThunk(
  'supportTickets/createSupportTicketData',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/support-create-ticket`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)

export const updateSupportTicketData = createAsyncThunk(
  'supportTickets/updateSupportTicketData',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/support-edit-ticket`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)




export const supportTicketSlice = createSlice({
  name: 'supportTickets',
  initialState,
  reducers: {
    // setIsLoading: (state, action) => {
    //     state.isLoading = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
    // fetchSupportTicketData 
      .addCase(fetchSupportTicketData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSupportTicketData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.supportTicketList = payload;
      })
      .addCase(fetchSupportTicketData.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // createSupportTicketData 
      .addCase(createSupportTicketData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSupportTicketData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(createSupportTicketData.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // updateSupportTicketData 
      .addCase(updateSupportTicketData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSupportTicketData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(updateSupportTicketData.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
  }
})

// Action creators are generated for each case reducer function
export const { } = supportTicketSlice.actions

export default supportTicketSlice.reducer