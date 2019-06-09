/*
 * @Author: 情雨随风
 * @Date: 2019-06-09 18:04:01
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-09 19:27:05
 * @Description: http请求状态捕获
 */

import { notification } from 'ant-design-vue'
import { removesetStore } from './Auxli'
import router from '../router'


//处理响应结果
export const Response = props => {
    let v = props.data
    if(v.code === 403) {
        //未登录
        notification.destroy()
        notification.info({
            message: '未登录！',
            duration: 1.5,
            description: ''
        })
        removesetStore()
        router.replace({ path: "/" })
    }
    else if(v.code === 402) {
        //权限不足
        notification.destroy()
        notification.warning({
            message: '权限不足！',
            duration: 1.5,
            description: ''
        })
    }
    else if(v.code === 201) {
        //参数缺失
        notification.destroy()
        notification.error({
            message: v.message,
            duration: 1.5,
            description: ''
        })
    }
    else if(v.code === 202) {
        //异常错误
        notification.destroy()
        notification.error({
            message: v.message,
            duration: 1.5,
            description: ''
        })
    }
    else if(v.code === 404) {
        //资源错误
        notification.destroy()
        notification.error({
            message: '服务器资源不存在！',
            duration: 1.5,
            description: ''
        })
    }
    else if(v.code === 500) {
        //服务器异常
        notification.destroy()
        notification.error({
            message: 'Server网络异常，请稍后重试！',
            duration: 1.5,
            description: ''
        })
    }

    return v
}


//响应异常捕获
export const ResCatch = props => {
    notification.destroy()
    notification.error({
        message: 'Server网络异常，请稍后重试！',
        duration: 1.5,
        description: ''
    })
    return props
}

