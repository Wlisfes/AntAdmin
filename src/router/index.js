/*
 * @Author: Parker 
 * @Date: 2019-05-05 11:16:18 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-05 11:22:37
 * @Types router导出
 */

import Vue from "vue"
import Router from "vue-router"
import routes from './routes'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
})