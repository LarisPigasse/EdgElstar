import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetHomeTracking } from 'services/HomeService'

export const getHomeTracking = createAsyncThunk(
    'homeTracking/data/getHomeTracking',
    async () => {
        const response = await apiGetHomeTracking()
        return response.data
    }
)

const dataSlice = createSlice({
    name: 'homeTracking/data',
    initialState: {
        loading: true,
        homeTrackingData: {},
    },
    reducers: {},
    extraReducers: {
        [getHomeTracking.fulfilled]: (state, action) => {
            state.homeTrackingData = action.payload
            state.loading = false
        },
        [getHomeTracking.pending]: (state) => {
            state.loading = true
        },
    },
})

export default dataSlice.reducer
