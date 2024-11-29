import ApiService from './ApiService'

export async function apiGetSistemaClienti(params) {
    return ApiService.fetchData({
        url: '/clienti/clienti-filter',
        method: 'get',
        params,
    })
}

export async function apiGetCliente(params) {
    //let id = params.id;
    let id = 1072;
    return ApiService.fetchData({
        url: `/clienti/cliente/${id}`,
        method: 'get',
        params,
    })
}

export async function apiInsertClienti(data) {
    return ApiService.fetchData({
        url: '/clienti',
        method: 'post',
        data,
    })
}

export async function apiUpdateClienti(data,params) {
    return ApiService.fetchData({
        url: `/clienti/${params}`,
        data,
        method: 'put'
    })
}

export async function apiDeleteClienti(id) {
    return ApiService.fetchData({
        url: `/clienti/${id}`,
        method: 'delete'
    })
}


