import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { Link } from 'react-router-dom'
import { apiGetListiniPv, apiGetListino, apiDeleteListini, apiInsertListini, apiUpdateListini } from 'services/ListiniService'

export const getListini = createAsyncThunk(
    'listini/data/getListini',
    async (data) => {       
        const response = await apiGetListino(data)
        return response.data
    }
)

// export const getListini = createAsyncThunk(
//     'listini/data/getListini',
//     async (data) => {
//         const response = await apiGetListiniPv(data)
//         return response.data
//     }
// )

export const initialTableData = {
    total: 0,
    pageIndex: 1,
    pageSize: 20,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

const dataSlice = createSlice({
    name: 'crmListiniPv/data',
    initialState: {
        loading: false,
        tableData: initialTableData
    },
    reducers: {
        setListini: (state, action) => {
            state.apiUpdateListini = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
    },
    extraReducers: {
        [getListini.fulfilled]: (state, action) => {
            state.orderList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getListini.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setListini, setTableData } = dataSlice.actions

export default dataSlice.reducer
