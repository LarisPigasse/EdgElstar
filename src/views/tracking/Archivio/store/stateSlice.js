import { createSlice, current } from '@reduxjs/toolkit'

const stateSlice = createSlice({
    name: 'trackingSpedizioni/state',
    initialState: {
        selectedRows: [],
        selectedRow: [],
        deleteMode: '',
        dataSpedizioni: {},
        modalNewSpedizioni: false,
        modalUpdateSpedizioni: false,
        modalViewSpedizioni: false,
        drawerInsertTracking: false,
        statiSpedizioni: [{value:'IN CONSEGNA',label:'IN CONSEGNA'},{value:'CONSEGNATA',label:'CONSEGNATA'}],
        archiviateSpedizioni: [{value:'SI',label:'SI'},{value:'NO',label:'NO'}]
    },
    reducers: {     
        setSelectedRows: (state, action) => {
            state.selectedRows = action.payload
        },
        setSelectedRow: (state, action) => {
            state.selectedRow = action.payload
        },
        addRowItem: (state, { payload }) => {
            const currentState = current(state)
            if (!currentState.selectedRows.includes(payload)) {
                return {
                    selectedRows: [...currentState.selectedRows, ...payload],
                }
            }
        },
        removeRowItem: (state, { payload }) => {
            const currentState = current(state)
            if (currentState.selectedRows.includes(payload)) {
                return {
                    selectedRows: currentState.selectedRows.filter(
                        (id) => id !== payload
                    ),
                }
            }
        },
        setDeleteMode: (state, action) => {
            state.deleteMode = action.payload
        },
        toggleModalNewSpedizioni: (state, action) => {
            state.modalNewSpedizioni = action.payload
        },
        toggleModalUpdateSpedizioni: (state, action) => {
            state.modalUpdateSpedizioni = action.payload
        },
        toggleModalViewSpedizioni: (state, action) => {
            state.modalViewSpedizioni = action.payload
        },
        toggleDrawerInsertTracking: (state, action) => {
            state.drawerInsertTracking = action.payload
        },
        setDataSpedizioni: (state, action) => {
            state.dataSpedizioni = action.payload
        },
    },
})

export const {
    setSelectedRows,
    setSelectedRow,
    addRowItem,
    removeRowItem,
    toggleDeleteConfirmation,
    setDeleteMode,
    toggleModalNewSpedizioni,
    toggleModalUpdateSpedizioni,
    toggleModalViewSpedizioni,
    toggleDrawerInsertTracking,
    setDataSpedizioni,
} = stateSlice.actions

export default stateSlice.reducer
