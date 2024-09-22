import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, BASE_URL } from '../api/apiConfig';
import { datavalidationerror, successToast } from '../utils';
import toast from 'react-hot-toast';

const initialState = {
    isLoading: true,
    footerList: [],
    socialList: [],
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


export const createFooter = createAsyncThunk(
    'user/createFooter',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
            const response = await api.post(`${BASE_URL}/admin-create-footer-link`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(response.data.message)
            return response?.data?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)


export const updateToggleFooter = createAsyncThunk(
    'user/updateToggleFooter',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
            const response = await api.post(`${BASE_URL}/admin-toggle-footer-link`, data, {
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



export const updateFooter = createAsyncThunk(
    'user/updateFooter',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
            const response = await api.post(`${BASE_URL}/admin-update-footer-link`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(response.data.message)
            return response?.data?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)


export const fetchSocialData = createAsyncThunk(
    'user/fetchSocialData',
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
            const response = await api.get(`${BASE_URL}/admin-list-platform-links?limit=10000&current_page=1`, {
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


export const updateSocialData = createAsyncThunk(
    'user/updateSocialData',
    async (data, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
            const response = await api.post(`${BASE_URL}/admin-update-platform-link`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(response.data.message)
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
            // fetchFooterData 
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
            // createFooter 
            .addCase(createFooter.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createFooter.fulfilled, (state, { payload }) => {
                state.isLoading = false;
            })
            .addCase(createFooter.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // createFooter 
            .addCase(updateFooter.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateFooter.fulfilled, (state, { payload }) => {
                state.isLoading = false;
            })
            .addCase(updateFooter.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // updateSocialData 
            .addCase(updateSocialData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateSocialData.fulfilled, (state, { payload }) => {
                state.isLoading = false;
            })
            .addCase(updateSocialData.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchSocialData 
            .addCase(fetchSocialData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchSocialData.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.socialList = payload;
            })
            .addCase(fetchSocialData.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
    }
})

// Action creators are generated for each case reducer function
export const { } = footerSlice.actions

export default footerSlice.reducer