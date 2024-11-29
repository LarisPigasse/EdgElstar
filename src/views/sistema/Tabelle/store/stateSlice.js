import { createSlice, current } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'sistemaNazioni/state',
    initialState: {
        selectedRows: [],
        selectedRow: [],
        deleteMode: '',
        dataOperatore: ''
    },
    reducers: {   
        setDataNazioni: (state, action) => {
            state.dataNazioni = action.payload
        },
    },
})

export const {
} = stateSlice.actions

export default stateSlice.reducer
