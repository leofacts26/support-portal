import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, BASE_URL } from '../../api/apiConfig';
import { datavalidationerror, successToast } from '../../utils';
import toast from 'react-hot-toast';
import { cater_vendor_type, tiffin_vendor_type } from '../../constants';

const initialState = {
  isLoading: true,
  mealTypesList: [],
}

export const fetchMealTypes = createAsyncThunk(
  'catering/fetchMealTypes',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.get(`${BASE_URL}/admin-list-meal-times?current_page=1&limit=100`, {
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

export const createMealTime = createAsyncThunk(
  'user/createMealTime',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/admin-create-meal-time`, data, {
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

export const updateToggleMealTime = createAsyncThunk(
  'user/updateToggleMealTime',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/admin-toggle-meal-time`, data, {
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

export const updateMealTime = createAsyncThunk(
  'user/updateMealTime',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/admin-update-meal-time`, data, {
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


export const mealSlice = createSlice({
  name: 'mealtypes',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      // fetchMealTypes 
      .addCase(fetchMealTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMealTypes.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.mealTypesList = payload;
      })
      .addCase(fetchMealTypes.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // createMealTime 
      .addCase(createMealTime.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMealTime.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(createMealTime.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // updateMealTime 
      .addCase(updateMealTime.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateMealTime.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(updateMealTime.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })

  }
})

// Action creators are generated for each case reducer function
export const { } = mealSlice.actions

export default mealSlice.reducer