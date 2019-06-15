/*
 * @Author: 情雨随风
 * @Date: 2019-06-05 23:03:23
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-15 12:51:25
 * @Description: 登录机制接口
 */


import http from '@/lib/http'


//登录
export const loginFN = props => {
    return http.post(props, `/login/user`)
}


//登出
export const logOutFN = props => {
    return http.get(props, `/logOut/user`)
}


//注册
export const postUser = props => {
    return http.post(props, `/post/user`)
}


//开放用户
export const OpenUserFn = props => {
    return http.get(props, `/open/user`)
}


//关闭用户
export const OpenDownFn = props => {
    return http.get(props, `/down/user`)
}


//修改用户资料
export const UpdateUser = props => {
    return http.post(props, `/update/user`)
}


//获取用户列表
export const getUserListFn = props => {
    return http.get(props, `/all/user`)
}

