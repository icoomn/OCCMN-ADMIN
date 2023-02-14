import axios from 'axios'
import IRequestData from '@/models/IRequestData'
import IResponseData from '@/models/IResponseData'
import { ElMessage, ElLoading } from 'element-plus'
import router from '@/routers/index'

const instance = axios.create({
    baseURL: '/api/',
    timeout: 3000
})

instance.interceptors.request.use((config) => {
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
            if (model.code === '0000') {
                resolve(model.data)
            } else if (model.code === '401') {
                router.push('/')
            } else {
                ElMessage.error(model.message || '接口请求失败')
            }
        }).catch(error => {
            reject(error)
            loading && loading.close()
        })
    })
}

export default request