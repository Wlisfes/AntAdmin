/*
 * @Date: 2019-06-05 16:40:13
 * @Author: 情雨随风
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-05 17:51:12
 * @Description: 接口文件
 */


import Api from './Api'
import http from './http'



/**
 * 注册
 * @param { Object } props 
 */
export const register = props => http.post(props, Api.POST_USER)

/**
 * 登陆
 * @param { Object } props 
 */
export const login = props => http.post(Api.POST_USER, props)