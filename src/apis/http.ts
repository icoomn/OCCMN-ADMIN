import axios from 'axios'
import IRequestData from '@/models/IRequestData'
import IResponseData from '@/models/IResponseData'
import { ElMessage, ElLoading } from 'element-plus'
import router from '../routers/index'

const instance = axios.create({
    baseURL: '/api/',
    timeout: 3000
})

instance.interceptors.request.use((config) => {
    const loginForm = localStorage.getItem('loginForm')
    let token = ''
    if (loginForm) {
        token = JSON.parse(loginForm).token
    }
    config.headers.Authorization = 'Bearer ' + token
    return config
}, (error) => {
    return Promise.reject(error)
})

instance.interceptors.response.use((res) => {
    return res
}, (error) => {
    return Promise.reject(error)
})

let loading: any = null
const request = <T>(params: IRequestData): Promise<T> => {
    return new Promise((resolve, reject) => {
        params.loading && (loading = ElLoading.service({ text: 'loading...' }))
        !params.method && (params.method = 'GET')
        instance.request({
            url: params.url,
            method: params.method,
            data: params.method !== 'GET' ? params.data : null,
            params: params.method === 'GET' ? params.data : null,
        }).then(res => {
            loading && loading.close()
            const model = res.data as IResponseData<T>
            if (model.code === '000') {
                resolve(model.data)
            } else {
                ElMessage.error(model.message || '接口请求失败')
            }
        }).catch(error => {
            const res = error.response
            if (res.data.code === '401') {
                router.push('/login')
            }
            reject(res.data)
        }).finally(() => {
            loading && loading.close()
        })
    })
}

export default request