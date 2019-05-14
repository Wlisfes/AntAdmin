/*
 * @Author: 情雨随风 
 * @Date: 2019-05-10 23:10:00 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-14 22:02:25
 * @Types 辅助工具函数
 */


import Cookies from 'js-cookie'


//获取Token
export const getToken = () => {
    const token = Cookies.get('token')
    if(token)
        return token
    else
        return false
}

//储存Token
export const setToken = token => {
    Cookies.set('token', token, { expires: 1 })
}

//删除Token
export const removeToken = () => {
    Cookies.remove('token')
    return false
}