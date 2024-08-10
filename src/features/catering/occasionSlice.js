import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, BASE_URL } from '../../api/apiConfig';
import { datavalidationerror, successToast } from '../../utils';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: true,
  occasionsList: [],
}

export const fetchOccasionList = createAsyncThunk(
  'catering/fetchOccasionList',
  async (catering, thunkAPI) => {
    try {
      const response = await api.get(`${BASE_URL}/get-all-occasions?current_page=1&limit=10`);
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)

export const updateToggleOccasion = createAsyncThunk(
  'user/updateToggleOccasion',
  async (occasionData, thunkAPI) => {
    try {
      const response = await api.post(`${BASE_URL}/admin-toggle-occasion`, occasionData);
      toast.success(successToast(response))
      // return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)


export const occasionSlice = createSlice({
  name: 'occasion',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      // fetchOccasionList 
      .addCase(fetchOccasionList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOccasionList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.occasionsList = payload;
      })
      .addCase(fetchOccasionList.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })

  }
})

// Action creators are generated for each case reducer function
export const { } = occasionSlice.actions

export default occasionSlice.reducer