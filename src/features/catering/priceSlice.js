import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, BASE_URL } from '../../api/apiConfig';
import { datavalidationerror, successToast } from '../../utils';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: true,
  priceRangesList: [],
}

export const fetchpriceRangesList = createAsyncThunk(
  'catering/fetchpriceRangesList',
  async (catering, thunkAPI) => {
    try {
      const response = await api.get(`${BASE_URL}/admin-list-price-ranges?current_page=1&limit=10&vendor_type=Caterer`);
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
      const response = await api.post(`${BASE_URL}/admin-create-price-range`, data);
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)

// export const updateToggleOccasion = createAsyncThunk(
//   'user/updateToggleOccasion',
//   async (occasionData, thunkAPI) => {
//     try {
//       const response = await api.post(`${BASE_URL}/admin-toggle-occasion`, occasionData);
//       toast.success(successToast(response))
//       // return response?.data?.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response.data.msg);
//     }
//   }
// )


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