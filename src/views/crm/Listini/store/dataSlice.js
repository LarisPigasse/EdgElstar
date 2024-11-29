import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetListini, apiDeleteListini, apiInsertListini, apiUpdateListini } from 'services/ListiniService'

export const getListini = createAsyncThunk(
    'listini/data/getListini',
    async (data) => {
        const response = await apiGetListini(data)
        return response.data
    }
)

export const insertListini = async ( data ) => {
    const response = await apiInsertListini(data)
    return response.data
}

export const updateListini = async ( data, params ) => {
    const response = await apiUpdateListini(data, params)
    return response.data
}

export const deleteListini = async (data) => {
    const response = await apiDeleteListini(data)
    return response.data
}

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
    name: 'crmListini/data',
    initialState: {
        loading: false,
        orderList: [],
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
