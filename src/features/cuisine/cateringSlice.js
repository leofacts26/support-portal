import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, BASE_URL } from '../../api/apiConfig';
import { datavalidationerror } from '../../utils';
import toast from 'react-hot-toast';

const initialState = {
    isLoading: true,
    cateringVendors: [],
    cateringFoodTypes: [],
}

export const fetchCateringVendors = createAsyncThunk(
    'catering/fetchCateringVendors',
    async (catering, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/admin-list-vendors`);
            return response?.data?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

export const fetchCateringFoodTypes = createAsyncThunk(
    'catering/fetchCateringFoodTypes',
    async (catering, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/admin-list-food-types`);
            return response?.data?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)


export const cateringSlice = createSlice({
    name: 'catering',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // fetchCateringVendors 
            .addCase(fetchCateringVendors.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCateringVendors.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.cateringVendors = payload;
            })
            .addCase(fetchCateringVendors.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchCateringVendors 
            .addCase(fetchCateringFoodTypes.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchCateringFoodTypes.fulfilled, (state, { payload }) => {
                console.log(payload, "payload");
                state.isLoading = false;
                state.cateringFoodTypes = payload;
            })
            .addCase(fetchCateringFoodTypes.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
    }
})

// Action creators are generated for each case reducer function
export const { } = cateringSlice.actions

export default cateringSlice.reducer