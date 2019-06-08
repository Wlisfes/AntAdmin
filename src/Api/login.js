/*
 * @Author: 情雨随风
 * @Date: 2019-06-05 23:03:23
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-09 01:02:38
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


//获取用户列表
export const getUserListFn = props => {
    return http.get(props, `/all/user`)
}

