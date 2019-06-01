/*
 * @Author: 情雨随风 
 * @Date: 2019-05-05 22:26:00 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-17 16:38:49
 * @Types Api接口文件
 */

import http from './http'

//注册
export const AdminEnrolment = param => http(param, `/Admin/enrolment`, `POST`)

//登录
export const ApiLoginUser = param => http(param, `/api/login/user`, `POST`)

//获取所有用户
export const AdminAllUser = param => http(param, `/Admin/alluser`)


