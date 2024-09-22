import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, BASE_URL } from '../api/apiConfig';
import { datavalidationerror, successToast } from '../utils';
import toast from 'react-hot-toast';

const initialState = {
    isLoading: true,
    dashboardCount: [],
    dashboardCityCount: [],
    dashboardAreaCount: [],
    dashboardInactiveVendors: [],
    dashboardSubscriptionChartData: [],
    vendorCatererSubCount: [],
    vendorTiffinSubCount: [],
}

export const fetchDashboardCount = createAsyncThunk(
    'user/fetchDashboardCount',
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
            const response = await api.get(`${BASE_URL}/admin-dashboard-count?current_page=1&limit=10000`, {
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


export const fetchAdminDashboardCityCount = createAsyncThunk(
    'user/fetchAdminDashboardCityCount',
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
            const response = await api.get(`${BASE_URL}/admin-dashboard-city-count?current_page=1&limit=10000`, {
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



export const fetchAdminDashboardAreaCount = createAsyncThunk(
    'user/fetchAdminDashboardAreaCount',
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
            const response = await api.get(`${BASE_URL}/admin-dashboard-area-count?current_page=1&limit=10000`, {
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


export const fetchAdminDashboardInactiveVendors = createAsyncThunk(
    'user/fetchAdminDashboardInactiveVendors',
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
            const response = await api.get(`${BASE_URL}/admin-dashboard-inactive-vendors?current_page=1&limit=10000`, {
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


export const fetchAdminDashboardSubscriptionChart = createAsyncThunk(
    'user/fetchAdminDashboardSubscriptionChart',
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
            const response = await api.get(`${BASE_URL}/admin-dashboard-subscription-charts?current_page=1&limit=10000&vendor_type=Caterer`, {
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


export const fetchDashboardVendorSubCountCaterer = createAsyncThunk(
    'user/fetchDashboardVendorSubCountCaterer',
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
            const response = await api.get(`${BASE_URL}/admin-dashboard-vendor-subscription-counts?current_page=1&limit=10000&vendor_type=Caterer`, {
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


export const fetchDashboardVendorSubCountTiffin = createAsyncThunk(
    'user/fetchDashboardVendorSubCountTiffin',
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
            const response = await api.get(`${BASE_URL}/admin-dashboard-vendor-subscription-counts?current_page=1&limit=10000&vendor_type=Tiffin`, {
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



export const dashboardSlice = createSlice({
    name: 'dashboardSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDashboardCount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDashboardCount.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.dashboardCount = payload;
            })
            .addCase(fetchDashboardCount.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchAdminDashboardCityCount 
            .addCase(fetchAdminDashboardCityCount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAdminDashboardCityCount.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.dashboardCityCount = payload;
            })
            .addCase(fetchAdminDashboardCityCount.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchAdminDashboardAreaCount 
            .addCase(fetchAdminDashboardAreaCount.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAdminDashboardAreaCount.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.dashboardAreaCount = payload;
            })
            .addCase(fetchAdminDashboardAreaCount.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchAdminDashboardInactiveVendors 
            .addCase(fetchAdminDashboardInactiveVendors.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAdminDashboardInactiveVendors.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.dashboardInactiveVendors = payload;
            })
            .addCase(fetchAdminDashboardInactiveVendors.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchAdminDashboardSubscriptionChart 
            .addCase(fetchAdminDashboardSubscriptionChart.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchAdminDashboardSubscriptionChart.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.dashboardSubscriptionChartData = payload;
            })
            .addCase(fetchAdminDashboardSubscriptionChart.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchDashboardVendorSubCountCaterer 
            .addCase(fetchDashboardVendorSubCountCaterer.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDashboardVendorSubCountCaterer.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.vendorCatererSubCount = payload;
            })
            .addCase(fetchDashboardVendorSubCountCaterer.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchDashboardVendorSubCountTiffin 
            .addCase(fetchDashboardVendorSubCountTiffin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchDashboardVendorSubCountTiffin.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.vendorTiffinSubCount = payload;
            })
            .addCase(fetchDashboardVendorSubCountTiffin.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
    }
})

// Action creators are generated for each case reducer function
export const { } = dashboardSlice.actions

export default dashboardSlice.reducer