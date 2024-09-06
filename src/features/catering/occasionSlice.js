import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, BASE_URL } from '../../api/apiConfig';
import { datavalidationerror, successToast } from '../../utils';
import toast from 'react-hot-toast';

const initialState = {
  isLoading: true,
  occasionsList: [],
  occasionId: null,
}

export const fetchOccasionList = createAsyncThunk(
  'catering/fetchOccasionList',
  async (catering, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.get(`${BASE_URL}/admin-list-occasions?current_page=1&limit=100`, {
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

export const createOccasionData = createAsyncThunk(
  'user/createOccasionData',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/admin-create-occasion`, data, {
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


export const updateToggleOccasion = createAsyncThunk(
  'user/updateToggleOccasion',
  async (occasionData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/admin-toggle-occasion`, occasionData, {
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


export const updateOccasionData = createAsyncThunk(
  'user/updateOccasionData',
  async (data, thunkAPI) => {
    try {
      const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
      const response = await api.post(`${BASE_URL}/admin-update-occasion`, data, {
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



export const occasionSlice = createSlice({
  name: 'occasion',
  initialState,
  reducers: {
    setOccasionId: (state, action) => {
      state.occasionId = action.payload;
    }
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
      // createOccasionData 
      .addCase(createOccasionData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOccasionData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(createOccasionData.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })
      // updateOccasionData 
      .addCase(updateOccasionData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOccasionData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(updateOccasionData.rejected, (state, { payload }) => {
        state.isLoading = false;
        toast.error(datavalidationerror(payload));
      })

  }
})

// Action creators are generated for each case reducer function
export const { setOccasionId } = occasionSlice.actions

export default occasionSlice.reducer