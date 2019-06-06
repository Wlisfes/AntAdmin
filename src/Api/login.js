/*
 * @Author: 情雨随风
 * @Date: 2019-06-05 23:03:23
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-06 23:45:15
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