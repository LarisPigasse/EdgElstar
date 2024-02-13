import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetAggiornamenti } from 'services/SpedizioniService'

export const getAggiornamenti = createAsyncThunk(
    'trackingAggiornamenti/data/getAggiornamenti',
    async (data) => {
        const response = await apiGetAggiornamenti(data)
        return response.data
    }
)

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

const dataSlice = createSlice({
    name: 'trackingAggiornamenti/data',
    initialState: {
        loading: false,
        orderList: [],
        tableData: initialTableData
    },
    reducers: {
        setOrderList: (state, action) => {
            state.orderList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
    },
    extraReducers: {
        [getAggiornamenti.fulfilled]: (state, action) => {
            state.orderList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getAggiornamenti.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setAggiornamenti, setTableData } = dataSlice.actions

export default dataSlice.reducer
