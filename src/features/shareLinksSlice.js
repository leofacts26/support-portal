import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, BASE_URL } from '../api/apiConfig';
import { datavalidationerror, successToast } from '../utils';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: true,
  supportSharedLinksList: []
}


export const fetchSupportSharedLinksData = createAsyncThunk(
  'shareLinks/fetchSupportSharedLinksData',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.get(`${BASE_URL}/support-list-shared-links?current_page=1&limit=3000`, {
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

export const createSupportshareLinksData = createAsyncThunk(
  'shareLinks/createSupportshareLinksData',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/support-create-shared-link`, data, {
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

export const updateSupportshareLinksData = createAsyncThunk(
  'shareLinks/updateSupportshareLinksData',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/support-update-shared-link`, data, {
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


export const createNewVendor = createAsyncThunk(
  'shareLinks/createNewVendor',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/support-create-vendor-quick`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(response.data.data.message)
      return response?.data?.data;
    } catch (error) {
      console.log(error, "error");
      toast.error(datavalidationerror(error));
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)



export const shareLinksSlice = createSlice({
  name: 'shareLinks',
  initialState,
  reducers: {
    // setIsLoading: (state, action) => {
    //     state.isLoading = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      // fetchSupportSharedLinksData 
      .addCase(fetchSupportSharedLinksData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSupportSharedLinksData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.supportSharedLinksList = payload;
      })
      .addCase(fetchSupportSharedLinksData.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // createSupportshareLinksData 
      .addCase(createSupportshareLinksData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createSupportshareLinksData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(createSupportshareLinksData.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // updateSupportshareLinksData 
      .addCase(updateSupportshareLinksData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSupportshareLinksData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(updateSupportshareLinksData.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // createNewVendor 
      .addCase(createNewVendor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNewVendor.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(createNewVendor.rejected, (state, { payload }) => {
        state.isLoading = false;
        // toast.error(datavalidationerror(payload));
      })
  }
})

// Action creators are generated for each case reducer function
export const { } = shareLinksSlice.actions

export default shareLinksSlice.reducer