import ApiService from './ApiService'

export async function apiGetHomeTracking(params) {
    return ApiService.fetchData({
        url: '/home/tracking',
        method: 'get',
        params,
    })
}


