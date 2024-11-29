import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetNazioni } from 'services/SistemaService'

export const getNazioni = createAsyncThunk(
    'sistemaNazioni/data/getNazioni',
    async (data) => {
        const response = await apiGetNazioni(data)
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
    name: 'sistemaNazioni/data',
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
        [getNazioni.fulfilled]: (state, action) => {
            state.orderList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getNazioni.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setNazioni, setTableData } = dataSlice.actions

export default dataSlice.reducer
