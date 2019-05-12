/*
 * @Author: 情雨随风 
 * @Date: 2019-05-10 23:10:00 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-10 23:10:50
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