/* jshint esversion: 6 */
import axios from 'axios'

const yi = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json; charset=utf-8'
    },
    timeout: 5000
})

// 请求拦截器
yi.interceptors.request.use(
    config => {
        // 在发送请求之前做某事
        config.headers['Content-Type'] = 'application/json;charset=utf-8'
        config.data =
            config.method === 'post'
                ? JSON.stringify({
                    ...config.data
                })
                : config.data
        return config
    },
    error => {
        // 请求错误时做些事
        return Promise.reject(error)
    }
)

// 返回拦截器
yi.interceptors.response.use(
    response => {
        if (response.data.success) {
            return Promise.resolve(response.data.data)
        } else {
            window['app'].$Message.error(response.data.message)
            return Promise.reject(response)
        }
    },
    error => {
        window['app'].$Message.error(error.message)
        return Promise.reject(error)
    }
)

export default yi
