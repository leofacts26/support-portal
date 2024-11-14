import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, BASE_URL } from '../api/apiConfig';
import { datavalidationerror, successToast } from '../utils';
import toast from 'react-hot-toast';

const initialState = {
    isLoading: true,
    menuList: [],
    vendorDetails: {}
}


export const fetchMenuData = createAsyncThunk(
    'menu/fetchMenuData',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
            const response = await api.get(`${BASE_URL}/support-get-menus`, {
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


export const fetchVendorShowDetailData = createAsyncThunk(
    'menu/fetchVendorShowDetailData',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
            const response = await api.get(`${BASE_URL}/support-get-vendor-show-details?company_id=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response?.data?.data;
        } catch (error) {


            toast.error(datavalidationerror(error));
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

export const fetchVendorTiffinShowDetailData = createAsyncThunk(
    'menu/fetchVendorTiffinShowDetailData',
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
            const response = await api.get(`${BASE_URL}/support-update-tiffin-package-details?company_id=${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response?.data?.data;
        } catch (error) {


            toast.error(datavalidationerror(error));
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)




export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        // setIsLoading: (state, action) => {
        //     state.isLoading = action.payload;
        // },
        // setCuisineId: (state, action) => {
        //     state.cuisineId = action.payload;
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVendorShowDetailData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchVendorShowDetailData.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.vendorDetails = payload;
            })
            .addCase(fetchVendorShowDetailData.rejected, (state, { payload }) => {
                state.isLoading = false;
            })
            .addCase(fetchVendorTiffinShowDetailData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchVendorTiffinShowDetailData.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.vendorDetails = payload;
            })
            .addCase(fetchVendorTiffinShowDetailData.rejected, (state, { payload }) => {
                state.isLoading = false;
            })
            // fetchMenuData 
            .addCase(fetchMenuData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchMenuData.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.menuList = payload;
            })
            .addCase(fetchMenuData.rejected, (state, { payload }) => {
                state.isLoading = false;
            })
    }
})

// Action creators are generated for each case reducer function
export const { } = menuSlice.actions

export default menuSlice.reducer