import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, BASE_URL } from '../api/apiConfig';
import { datavalidationerror } from '../utils';
import toast from 'react-hot-toast';

const initialState = {
    isLoading: true,
    footerList: [],
}


export const fetchFooterData = createAsyncThunk(
    'user/fetchFooterData',
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
            const response = await api.get(`${BASE_URL}/admin-list-footer-links?limit=100&current_page=1&vendor_type=Caterer`, {
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


export const footerSlice = createSlice({
    name: 'footerSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFooterData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchFooterData.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.footerList = payload;
            })
            .addCase(fetchFooterData.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
    }
})

// Action creators are generated for each case reducer function
export const { } = footerSlice.actions

export default footerSlice.reducer