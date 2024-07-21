import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: 0,
}

export const cuisineSlice = createSlice({
    name: 'cuisine',
    initialState,
    reducers: {
       
    },
})

// Action creators are generated for each case reducer function
export const {  } = cuisineSlice.actions

export default cuisineSlice.reducer