/*
 * @Author: 情雨随风 
 * @Date: 2019-05-05 22:26:00 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-05 22:28:16
 * @Types Api接口文件
 */

import http from './http'

//项目列表
export const getThingList = param => http(param, `/ThingList`)