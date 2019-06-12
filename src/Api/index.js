/*
 * @Date: 2019-06-05 16:40:13
 * @Author: 情雨随风
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-12 22:37:52
 * @Description: 接口文件
 */


import * as login from './login'
import * as taske from './taske'
import * as tags from './tags'
import * as book from './book'



export default {
    ...login,
    ...taske,
    ...tags,
    ...book
}

