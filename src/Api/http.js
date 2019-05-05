/*
 * @Author: 情雨随风 
 * @Date: 2019-05-05 22:24:18 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-05 22:24:46
 * @Types axios配置
 */


import axios from 'axios'
import logo from './logo'


axios.defaults.baseURL='http://localhost:4000'
// axios.defaults.withCredentials = true


//请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
})

//响应拦截器
axios.interceptors.response.use(
    res => {
        logo(res.request, res)
        return res
    },
    err => {
        logo(err.request, err.response)
        return err
    }
)

const http = (param, url, type = 'GET') => {
    return new Promise((resolve, reject) => {
        if (type == 'GET') {
            axios.get(url, param).then(res => {
                resolve(res.data)
            }).catch(e => {
                reject(e)
            })
        }
        else if(type == 'POST') {
            axios.post(url, param).then(res => {
                resolve(res.data)
            }).catch(e => {
                reject(e)
            })
        }
    })
}


export default http