import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, BASE_URL } from '../../api/apiConfig';
import { datavalidationerror, successToast } from '../../utils';
import toast from 'react-hot-toast';

const initialState = {
    isLoading: true,
    exploreCities: [],
    newsLetters: [],
}



export const fetchexplorecitiesData = createAsyncThunk(
    'user/fetchexplorecitiesData',
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
            const response = await api.get(`${BASE_URL}/admin-list-explore-cities`, {
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


export const createExplorecity = createAsyncThunk(
    'user/createExplorecity',
    async (cityData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
            const response = await api.post(`${BASE_URL}/admin-create-new-explore-city`, cityData, {
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


export const updateExplorecity = createAsyncThunk(
    'user/updateExplorecity',
    async (cityData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
            const response = await api.post(`${BASE_URL}/admin-update-explore-city`, cityData, {
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


export const updateToggleExplorecity = createAsyncThunk(
    'user/updateExplorecity',
    async (cityData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
            const response = await api.post(`${BASE_URL}/admin-toggle-explore-city`, cityData, {
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

// fetchNewsletter 
export const fetchNewsletter = createAsyncThunk(
    'user/fetchNewsletter',
    async (user, thunkAPI) => {
        try {
            const token = thunkAPI.getState().authSlice.token || localStorage.getItem('token');
            const response = await api.get(`${BASE_URL}/admin-list-email-subscriptions`, {
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



export const homeSlice = createSlice({
    name: 'homepage',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // fetchexplorecitiesData 
            .addCase(fetchexplorecitiesData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchexplorecitiesData.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.exploreCities = payload;
            })
            .addCase(fetchexplorecitiesData.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // createExplorecity 
            .addCase(createExplorecity.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(createExplorecity.fulfilled, (state, { payload }) => {
                state.isLoading = false;
            })
            .addCase(createExplorecity.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // updateExplorecity 
            .addCase(updateExplorecity.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(updateExplorecity.fulfilled, (state, { payload }) => {
                state.isLoading = false;
            })
            .addCase(updateExplorecity.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
            // fetchNewsletter 
            .addCase(fetchNewsletter.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchNewsletter.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.newsLetters = payload;
            })
            .addCase(fetchNewsletter.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
    }
})

// Action creators are generated for each case reducer function
export const { } = homeSlice.actions

export default homeSlice.reducer