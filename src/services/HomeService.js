import ApiService from './ApiService'

export async function apiGetHomeTracking(params) {
    return ApiService.fetchData({
        url: '/home/tracking',
        method: 'get',
        params,
    })
}

export async function apiAggiornaTracking(params) {
    return ApiService.fetchData({
        url: '/spedizioni/aggiorna',
        method: 'get',
        params,
    })
}

