import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, BASE_URL } from '../api/apiConfig';
import { datavalidationerror, successToast } from '../utils';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: true,
  ticketStatus: true,
  supportTicketList: [],
  vendorSupportList: [],
  searchTerm: '',
  listUsers: [],
  viewAccess: ''
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
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)

export const supportGetViewAccess = createAsyncThunk(
  'supportTickets/supportGetViewAccess',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/support-get-view-access`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });      
      return response?.data.access;
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
      toast.success(response.data.message)
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)

export const fetchVendorListtData = createAsyncThunk(
  'supportTickets/fetchVendorListtData',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.get(`${BASE_URL}/support-list-vendors-active`, {
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


export const fetchSupportListUsers = createAsyncThunk(
  'supportTickets/fetchSupportListUsers',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.get(`${BASE_URL}/support-list-users?current_page=1&limit=3000`, {
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


export const assignSupportTicket = createAsyncThunk(
  'supportTickets/assignSupportTicket',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/assign-agent-to-tickets`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.message)
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
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
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
      // assignSupportTicket 
      .addCase(assignSupportTicket.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(assignSupportTicket.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(assignSupportTicket.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // updateSupportTicketData 
      .addCase(updateSupportTicketData.pending, (state) => {
        state.ticketStatus = true;
      })
      .addCase(updateSupportTicketData.fulfilled, (state, { payload }) => {
        state.ticketStatus = false;
      })
      .addCase(updateSupportTicketData.rejected, (state, { payload }) => {
        state.ticketStatus = false;
        toast.error(datavalidationerror(payload));
      })
      // fetchVendorListtData 
      .addCase(fetchVendorListtData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchVendorListtData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.vendorSupportList = payload;
      })
      .addCase(fetchVendorListtData.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // fetchSupportListUsers 
      .addCase(fetchSupportListUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSupportListUsers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.listUsers = payload;
      })
      .addCase(fetchSupportListUsers.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // supportGetViewAccess 
      .addCase(supportGetViewAccess.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(supportGetViewAccess.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.viewAccess = payload;
      })
      .addCase(supportGetViewAccess.rejected, (state, { payload }) => {
        state.isLoading = false;
        // toast.error(datavalidationerror(payload)); 
      })
  }
})

// Action creators are generated for each case reducer function
export const { setSearchTerm } = supportTicketSlice.actions

export default supportTicketSlice.reducer