import { data } from 'autoprefixer';
import ApiService from './ApiService'

export async function apiGetListini(params) {
    return ApiService.fetchData({
        url: '/listini/listini-filter',
        method: 'get',
        params,
    })
}

export async function apiGetListino(params) {
    let id = params.id;
    // delete params.id;
    return ApiService.fetchData({
        url: `/listini/listino/${id}`,
        method: 'get',
        params
    })
}

export async function apiGetListiniPv(params) {
    return ApiService.fetchData({
        url: `/listini/listino-pv/`,
        method: 'get',
        params,
    })
}

export async function apiInsertListini(data) {
    return ApiService.fetchData({
        url: '/listini',
        method: 'post',
        data,
    })
}

export async function apiUpdateListini(data, params) {
    return ApiService.fetchData({
        url: `/listini/${params}`,
        data,
        method: 'put'
    })
}

export async function apiDeleteListini(id) {
    return ApiService.fetchData({
        url: `/listini/${id}`,
        method: 'delete'
    })
}

export async function apiInsertListiniPv(data) {
    return ApiService.fetchData({
        url: '/listini',
        method: 'post',
        data,
    })
}

export async function apiUpdateListiniPv(data, params) {
    return ApiService.fetchData({
        url: `/listini/${params}`,
        data,
        method: 'put'
    })
}

export async function apiDeleteListiniPv(id) {
    return ApiService.fetchData({
        url: `/listini/${id}`,
        method: 'delete'
    })
}

