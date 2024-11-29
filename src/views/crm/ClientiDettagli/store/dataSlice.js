import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetCliente } from 'services/ClientiService'

export const getCliente = createAsyncThunk(
    'cliente/data/getCliente',
    async (data) => {       
        const response = await apiGetCliente(data)
        return response.data
    }
)

const dataSlice = createSlice({
    name: 'crmCliente/data',
    initialState: {
        loading: false
    },
    reducers: {
        setCliente: (state, action) => {
            state.apiCliente = action.payload
        },
    },
    extraReducers: {
        [getCliente.fulfilled]: (state, action) => {
            state.cliente = action.payload.data
            state.loading = false
        },
        [getCliente.pending]: (state) => {
            state.loading = true
        },
    },
})

export const { setCliente } = dataSlice.actions

export default dataSlice.reducer
