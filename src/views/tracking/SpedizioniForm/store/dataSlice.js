import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import {apiGetCorrieri} from 'services/CorrieriService'
import {apiGetCliente} from 'services/ClientiService'

export const getCorrieri = createAsyncThunk(
    'trackingSpedizioneForm/data/getCorrieri',
    async () => {
        const response = await apiGetCorrieri()
        return response.data
    }
)

export const getClienti = createAsyncThunk(
    'trackingSpedizioneForm/data/getClienti',
    async () => {
        const response = await apiGetCliente()
        return response.data
    }
)

const dataSlice = createSlice({
    name: 'trackingSpedizioneForm/data',
    initialState: {
        loading: false,
        spedizioneData: [],
        corrieriData: [],
        clientiData: [],
    },
    reducers: {},
    extraReducers: {
        [getCorrieri.fulfilled]: (state, action) => {
            state.corrieriData = action.payload
            state.loading = false
        },
        [getClienti.fulfilled]: (state, action) => {
            state.clientiData = action.payload
            state.loading = false
        }                
    },
})

export default dataSlice.reducer
