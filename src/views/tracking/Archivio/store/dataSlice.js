import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiGetSpedizioniArchiviate, apiDeleteSpedizioni, apiInsertSpedizioni, 
            apiUpdateSpedizioni, apiGetTrackingSpedizione,apiInsertSpedizioniTracking,
            apiDeleteSpedizioniTracking } from 'services/SpedizioniService'

export const getSpedizioni = createAsyncThunk(
    'trackingSpedizioni/data/getSpedizioni',
    async (data) => {
        const response = await apiGetSpedizioniArchiviate(data)
        return response.data
    }
)

export const getTracking = createAsyncThunk(
    'trackingSpedizioni/data/getTracking',
    async (data) => {
        if(data === 0){
            return [];
        }
        const response = await apiGetTrackingSpedizione(data)
        return response.data
    }
)


export const insertSpedizioni = async ( data ) => {
    const response = await apiInsertSpedizioni(data)
    return response.data
}

export const updateSpedizioni = async ( data, params ) => {
    const response = await apiUpdateSpedizioni(data, params)
    return response.data
}

export const deleteSpedizioni = async (data) => {
    const response = await apiDeleteSpedizioni(data)
    return response.data
}

// export const getTrackingSpedizione = async (data) => {
//     const response = await apiGetTrackingSpedizione(data)
//     return await response.data
// }

export const insertTracking = async (data) => {
    const response = await apiInsertSpedizioniTracking(data)
    return await response.data
}

export const deleteTracking = async (data) => {
    const response = await apiDeleteSpedizioniTracking(data)
    return await response.data
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
    name: 'trackingSpedizioni/data',
    initialState: {
        loading: false,
        spedizioni: [],
        dataTracking: [],
        idDelete: {},
        tableData: initialTableData
    },
    reducers: {
        setTrackingSpedizioni: (state, action) => {
            state.trackingSpedizioni = action.payload
        },
        setOrderList: (state, action) => {
            state.orderList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setIdDelete: (state, action) => {
            state.idDelete = action.payload
        }
    },
    extraReducers: {
        [getSpedizioni.fulfilled]: (state, action) => {
            state.orderList = action.payload.data
            state.tableData.total = action.payload.total
            state.loading = false
        },
        [getSpedizioni.pending]: (state) => {
            state.loading = true
        },
        [getTracking.fulfilled]: (state, action) => {
            state.dataTracking = action.payload;
        }
    },
})

export const { setSpedizioni, setTableData, setTrackingSpedizioni,setIdDelete } = dataSlice.actions

export default dataSlice.reducer
