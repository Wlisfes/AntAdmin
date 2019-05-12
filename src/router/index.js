/*
 * @Author: Parker 
 * @Date: 2019-05-05 11:16:18 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-11 12:51:14
 * @Types router导出
 */

import Vue from "vue"
import Router from "vue-router"
import routes from './routes'
import { getToken } from '../lib/Auxli'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: routes
})

router.beforeEach((to, from, next) => {
    const token = getToken()
    // if (!token && to.name !== 'login') {
    //     //未登录且要跳转的页面不是登录页
    //     next({
    //         name: 'login'
    //     })
    // } else if(!token && to.name === 'login') {
    //     //未登陆且要跳转的页面是登录页
    //     next()
    // } else if(token && to.name === 'login') {
    //     //已登录且要跳转的页面是登录页
        
    // } else {
    //     next()
    // }
    next()
})


export default router