import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'cercaTracking/state',
    initialState: {
        cercaTrackingRows: [],
    },
    reducers: {
        setCercaTrackingRows: (state, action) => {
            state.cercaTrackingRows = action.payload
        },
    },
})

export const {
    setCercaTrackingRows,
} = stateSlice.actions

export default stateSlice.reducer
