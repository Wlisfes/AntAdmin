/*
 * @Author: 情雨随风 
 * @Date: 2019-05-05 22:26:00 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-11 01:02:56
 * @Types Api接口文件
 */

import http from './http'

//注册
export const AdminEnrolment = param => http(param, `/Admin/enrolment`, `POST`)