import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, BASE_URL } from '../../api/apiConfig';
import { datavalidationerror, successToast } from '../../utils';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: true,
  faqList: [],
}

export const fetchCatteringFaqs = createAsyncThunk(
  'catering/fetchCatteringFaqs',
  async (catering, thunkAPI) => {
    try {
      const response = await api.get(`${BASE_URL}/admin-list-faqs?limit=100&current_page=1&type=vendor`);
      return response?.data?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)


export const faqSlice = createSlice({
  name: 'faq',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      // fetchCatteringFaqs 
      .addCase(fetchCatteringFaqs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCatteringFaqs.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.faqList = payload;
      })
      .addCase(fetchCatteringFaqs.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })

  }
})

// Action creators are generated for each case reducer function
export const { } = faqSlice.actions

export default faqSlice.reducer