import { createSlice, current } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'trackingAggiornamenti/state',
    initialState: {
        selectedRows: [],
        selectedRow: [],
        dataAggiornamenti: '',
        modalViewAggiornamento: false,
    },
    reducers: {
        setSelectedRows: (state, action) => {
            state.selectedRows = action.payload
        },
        setSelectedRow: (state, action) => {
            state.selectedRow = action.payload
        },
        toggleModalViewCorriere: (state, action) => {
            state.modalViewCorriere = action.payload
        },        
        setDataAggiornamento: (state, action) => {
            state.dataCorriere = action.payload
        },
    },
})

export const {
    setSelectedRows,
    setSelectedRow,
    toggleModalViewAggiornamento,
    setDataAggiornamento,
} = stateSlice.actions

export default stateSlice.reducer
