import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { api, BASE_URL } from '../../api/apiConfig';
import { datavalidationerror } from '../../utils';
import toast from 'react-hot-toast';

const initialState = {
    userList: [],
}


export const fetchUserData = createAsyncThunk(
    'user/fetchUserData',
    async (user, thunkAPI) => {
        try {
            const response = await api.get(`${BASE_URL}/admin-list-users`);
            return response?.data?.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUserData.fulfilled, (state, { payload }) => {
                state.isLoading = false;
                state.userList = payload;
            })
            .addCase(fetchUserData.rejected, (state, { payload }) => {
                state.isLoading = false;
                toast.error(datavalidationerror(payload));
            })
    }
})

// Action creators are generated for each case reducer function
export const { } = usersSlice.actions

export default usersSlice.reducer