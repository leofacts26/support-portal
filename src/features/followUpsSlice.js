import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, BASE_URL } from '../api/apiConfig';
import { datavalidationerror, successToast } from '../utils';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: true,
  followUpList: [],
  agentVendorCommentsList: [],
}


export const fetchSupportFollowUpssList = createAsyncThunk(
  'shareLinks/fetchSupportFollowUpssList',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.get(`${BASE_URL}/support-list-vendors-followups?limit=100000000&current_page=1&vendor_type=Caterer`, {
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



export const assignAsignAgentVendor = createAsyncThunk(
  'supportTickets/assignAsignAgentVendor',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/support-assign-agent-to-vendor`, data, {
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

export const agentVendorComments = createAsyncThunk(
  'supportTickets/agentVendorComments',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.get(`${BASE_URL}/support-list-agent-vendor-comments?vendor_id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // toast.success(response.data.message)
      return response?.data?.data;
    } catch (error) {
      // toast.error(error.response.data.message)
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)


export const updateAgentComment = createAsyncThunk(
  'supportTickets/updateAgentComment',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/support-update-comment-for-agent-to-vendor`, data, {
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





export const followUpSlice = createSlice({
  name: 'followUps',
  initialState,
  reducers: {
    resetAgentVendorComments(state) {
      state.agentVendorCommentsList = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchSupportFollowUpssList 
      .addCase(fetchSupportFollowUpssList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSupportFollowUpssList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.followUpList = payload;
      })
      .addCase(fetchSupportFollowUpssList.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      // assignAsignAgentVendor 
      .addCase(assignAsignAgentVendor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(assignAsignAgentVendor.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(assignAsignAgentVendor.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // agentVendorComments 
      .addCase(agentVendorComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(agentVendorComments.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.agentVendorCommentsList = payload;
      })
      .addCase(agentVendorComments.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      // updateAgentComment 
      .addCase(updateAgentComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAgentComment.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(updateAgentComment.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload.message);
      })
  }
})

// Action creators are generated for each case reducer function
export const { resetAgentVendorComments } = followUpSlice.actions

export default followUpSlice.reducer