import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCercaTrackingSpedizione } from 'services/SpedizioniService'

export const getCercaTracking = createAsyncThunk(
    'cercaTracking/data/geCercaTracking',
    async () => {
        const response = await apiGetCercaTrackingSpedizione()
        return response.data
    }
)

const dataSlice = createSlice({
    name: 'cercaTracking/data',
    initialState: {
        loading: true,
        cercaTrackingData: {},
    },
    reducers: {},
    extraReducers: {
        [getCercaTracking.fulfilled]: (state, action) => {
            state.cercaTrackingData = action.payload
            state.loading = false
        },
        [getCercaTracking.pending]: (state) => {
            state.loading = true
        },
    },
})

export default dataSlice.reducer