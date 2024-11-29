import ApiService from './ApiService'

export async function apiGetNazioni(params) {
    return ApiService.fetchData({
        url: '/sistema/nazioni-filter',
        method: 'get',
        params,
    })
}

export async function apiInsertNazioni(data) {
    return ApiService.fetchData({
        url: '/sistema/nazioni',
        method: 'post',
        data,
    })
}

export async function apiUpdateNazioni(data, params) {
    return ApiService.fetchData({
        url: `/sistema/nazioni/${params}`,
        data,
        method: 'put'
    })
}

export async function apiDeleteNazioni(id) {
    return ApiService.fetchData({
        url: `/sistema/nazioni/${id}`,
        method: 'delete'
    })
}