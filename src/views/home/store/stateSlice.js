import { createSlice } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'homeTracking/state',
    initialState: {
        homeTrackingRows: [],
    },
    reducers: {
        setHomeTrackingRows: (state, action) => {
            state.homeTrackingRows = action.payload
        },
    },
})

export const {
    setHomeTrackingRows,
} = stateSlice.actions

export default stateSlice.reducer
