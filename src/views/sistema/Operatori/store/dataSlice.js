import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetSistemaOperatori, apiDeleteOperatori, apiInsertOperatori, apiUpdateOperatori } from 'services/OperatoriService'

export const getOperatori = createAsyncThunk(
    'sistemaOperatore/data/getOperatori',
    async (data) => {
        const response = await apiGetSistemaOperatori(data)
        return response.data
    }
)

export const insertOperatori = async ( data ) => {
    const response = await apiInsertOperatori(data)
    return response.data
}

export const updateOperatori = async ( data, params ) => {
    const response = await apiUpdateOperatori(data, params)
    return response.data
}

export const deleteOperatori = async (data) => {
    console.log(data);
    const response = await apiDeleteOperatori(data)
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
    name: 'sistemaOperatore/data',
    initialState: {
        loading: false,
        orderList: [],
        tableData: initialTableData
    },
    reducers: {
        setOperatori: (state, action) => {
            state.apiUpdateOperatori = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
    },
    extraReducers: {
        [getOperatori.fulfilled]: (state, action) => {
            state.orderList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getOperatori.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setOperatori, setTableData } = dataSlice.actions

export default dataSlice.reducer
