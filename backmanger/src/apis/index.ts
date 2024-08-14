import axios from 'axios'
import { TOEKN } from '@/config'
const env = import.meta.env
//1. /api开头的接口是提供增删改差的核心逻辑接口
//2. /fs开头的接口是提供文件读写的接口

console.log(env)

const api = axios.create({
    baseURL: env.MODE === 'development' ? 'http://localhost:9002' : '',
    timeout: 5000
})

axios.defaults.withCredentials = true

api.interceptors.request.use(config => {
    //携带token
    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem(TOEKN)
    return config
})

api.interceptors.response.use(res => {
    return res
})

export default api