import ApiService from './ApiService'

export async function apiGetPodPdf(id) {
    return ApiService.fetchData({
        url: `/spedizioni/pod/${id}`,
        method: 'get',
        responseType: 'blob'
    })
}

export async function apiGetTrackingSpedizione(id) {
    return ApiService.fetchData({
        url: `/spedizioni/tracking/${id}`,
        method: 'get',
    })
}

export async function apiGetSpedizioni(params) {
    return ApiService.fetchData({
        url: '/spedizioni/spedizioni-filter',
        method: 'get',
        params,
    })
}

export async function apiGetSpedizioniArchiviate(params) {
    return ApiService.fetchData({
        url: '/spedizioni/spedizioni-filter-archiviate',
        method: 'get',
        params,
    })
}

export async function apiGetSpedizione(id) {
    return ApiService.fetchData({
        url: `/spedizioni/spedizione/${id}`,
        method: 'get',
    })
}

export async function apiGetSpedizioniClienti(params) {
    return ApiService.fetchData({
        url: '/spedizioni/spedizioni-filter-clienti',
        method: 'get',
        params,
    })
}

export async function apiGetSpedizioniClientiArchiviate(params) {
    return ApiService.fetchData({
        url: '/spedizioni/spedizioni-filter-clienti-archiviate',
        method: 'get',
        params,
    })
}

export async function apiInsertSpedizioni(data) {
    return ApiService.fetchData({
        url: '/spedizioni',
        method: 'post',
        data,
    })
}

export async function apiUpdateSpedizioni(data) {
    return ApiService.fetchData({
        url: `/spedizioni`,
        data,
        method: 'put'
    })
}

export async function apiDeleteSpedizioni(idDelete) {
    return ApiService.fetchData({
        url: `/spedizioni/${idDelete.id_spedizione}/${idDelete.id_cliente}`,
        method: 'delete'
    })
}

export async function apiGetTrackingSpedizioniDetails(params) {
    return ApiService.fetchData({
        url: '/spedizioni/spedizioni-details',
        method: 'get',
        params,
    })
}

export async function apiDeleteSpedizioniTracking(params) {
    return ApiService.fetchData({
        url: `/spedizioni/tracking/${params.id_tracking}/${params.id_spedizione}`,
        method: 'delete',
    })
}

export async function apiInsertSpedizioniTracking(data) {
    return ApiService.fetchData({
        url: '/spedizioni/tracking',
        method: 'post',
        data,
    })
}