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
  async (type, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.get(`${BASE_URL}/admin-list-faqs?limit=100&current_page=1&type=${type}`, {
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

export const createCateringFaq = createAsyncThunk(
  'user/createCateringFaq',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/admin-faq-create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      toast.success(successToast(response))
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)

export const updateCateringFaq = createAsyncThunk(
  'user/updateCateringFaq',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/admin-faq-update`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(successToast(response))
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
)


export const updateToggleFaq = createAsyncThunk(
  'user/updateToggleFaq',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/admin-toggle-faq`, data, {
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
      // createCateringFaq 
      .addCase(createCateringFaq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCateringFaq.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(createCateringFaq.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // updateCateringFaq 
      .addCase(updateCateringFaq.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCateringFaq.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(updateCateringFaq.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })

  }
})

// Action creators are generated for each case reducer function
export const { } = faqSlice.actions

export default faqSlice.reducer