import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, BASE_URL } from '../../api/apiConfig';
import { datavalidationerror, successToast } from '../../utils';
import toast from 'react-hot-toast';
import { cater_vendor_type, tiffin_vendor_type } from '../../constants';

const initialState = {
  isLoading: true,
  priceRangesList: [],
  priceRangesListTiffin: [],
}

export const fetchpriceRangesList = createAsyncThunk(
  'catering/fetchpriceRangesList',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.get(`${BASE_URL}/admin-list-price-ranges?current_page=1&limit=10&vendor_type=${cater_vendor_type}`, {
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

export const fetchpriceRangesListTiffin = createAsyncThunk(
  'catering/fetchpriceRangesListTiffin',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.get(`${BASE_URL}/admin-list-price-ranges?current_page=1&limit=10&vendor_type=${tiffin_vendor_type}`, {
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

export const createPriceRanges = createAsyncThunk(
  'user/createPriceRanges',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/admin-create-price-range`, data, {
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

export const updateTogglePriceRanges = createAsyncThunk(
  'user/updateTogglePriceRanges',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/admin-toggle-price-range`, data, {
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

export const updatePriceRanges = createAsyncThunk(
  'user/updatePriceRanges',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/admin-update-price-range`, data, {
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


export const priceSlice = createSlice({
  name: 'priceranges',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      // fetchpriceRangesList 
      .addCase(fetchpriceRangesList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchpriceRangesList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.priceRangesList = payload;
      })
      .addCase(fetchpriceRangesList.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // fetchpriceRangesListTiffin 
      .addCase(fetchpriceRangesListTiffin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchpriceRangesListTiffin.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.priceRangesListTiffin = payload;
      })
      .addCase(fetchpriceRangesListTiffin.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // createPriceRanges 
      .addCase(createPriceRanges.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createPriceRanges.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(createPriceRanges.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })

  }
})

// Action creators are generated for each case reducer function
export const { } = priceSlice.actions

export default priceSlice.reducer