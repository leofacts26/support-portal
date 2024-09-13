import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, BASE_URL } from '../api/apiConfig';
import { datavalidationerror, successToast } from '../utils';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: true,
  adminRoleList: [],
  adminFeatureRoleList: [],
}


export const fetchAdminRoleListData = createAsyncThunk(
  'user/fetchAdminRoleListData',
  async (user, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.get(`${BASE_URL}/admin-list-roles?current_page=1&limit=1000000`, {
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

export const createAdminROle = createAsyncThunk(
  'user/createAdminROle',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/admin-create-role`, data, {
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


export const updateAdminRole = createAsyncThunk(
  'user/updateAdminRole',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/admin-role-update`, data, {
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


export const updateToggleAdminRolesRanges = createAsyncThunk(
  'user/updateToggleAdminRolesRanges',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/admin-toggle-roles`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(successToast(response))
      // return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)


export const fetchAdminListFuture = createAsyncThunk(
  'user/fetchAdminListFuture',
  async (user, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.get(`${BASE_URL}/admin-list-features?current_page=1&limit=100000`, {
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


export const adminRoleSlice = createSlice({
  name: 'roleSlice',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminRoleListData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminRoleListData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.adminRoleList = payload;
      })
      .addCase(fetchAdminRoleListData.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // createAdminROle 
      .addCase(createAdminROle.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAdminROle.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(createAdminROle.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // updateAdminRole 
      .addCase(updateAdminRole.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAdminRole.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(updateAdminRole.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // updateToggleAdminRolesRanges 
      .addCase(updateToggleAdminRolesRanges.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateToggleAdminRolesRanges.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(updateToggleAdminRolesRanges.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // fetchAdminListFuture 
      .addCase(fetchAdminListFuture.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAdminListFuture.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.adminFeatureRoleList = payload;
      })
      .addCase(fetchAdminListFuture.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
  }
})

// Action creators are generated for each case reducer function
export const { } = adminRoleSlice.actions

export default adminRoleSlice.reducer