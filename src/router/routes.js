/*
 * @Author: Parker 
 * @Date: 2019-05-05 11:22:56 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-17 17:03:56
 * @Types 界面路由
 */

import Admin from '@/view/Admin'
import Login from '@/view/Login'

export default [
    {
        path: '/login',
        name: 'login',
        Title: '登录',
        meta: {
            title: '登录'
        },
        component: Login
    },
    {
        path: '/',
        name: 'admin',
        component: Admin,
        redirect: '/main',
        children: [
            {
                path: '/main',
                name: 'main',
                meta: {
                    title: '主页'
                },
                component: () => import('@/view/Main.vue')
            },
            {
                path: '/user',
                name: 'user',
                meta: {
                    title: '用户注册'
                },
                component: () => import('@/view/User.vue')
            },
            {
                path: '/userlist',
                name: 'userlist',
                meta: {
                    title: '用户列表'
                },
                component: () => import('@/view/Userlist.vue')
            },
            {
                path: '/articlelist',
                name: 'articlelist',
                meta: {
                    title: '文章列表'
                },
                component: () => import('@/view/Articlelist.vue')
            },
            {
                path: '/article',
                name: 'article',
                meta: {
                    title: '新增文章'
                },
                component: () => import('@/view/Article.vue')
            },
            {
                path: '/noteslist',
                name: 'noteslist',
                meta: {
                    title: '笔记列表'
                },
                component: () => import('@/view/Noteslist.vue')
            },
            {
                path: '/notes',
                name: 'notes',
                meta: {
                    title: '新增笔记'
                },
                component: () => import('@/view/Notes.vue')
            },
            {
                path: '/taslist',
                name: 'taslist',
                meta: {
                    title: '标签列表'
                },
                component: () => import('@/view/Taslist.vue')
            },
            {
                path: '/thinglist',
                name: 'thinglist',
                meta: {
                    title: '项目列表'
                },
                component: () => import('@/view/Thinglist.vue')
            },
            {
                path: '/github',
                name: 'github',
                meta: {
                    title: 'GitHub'
                },
                component: () => import('@/view/GitHub.vue')
            },
            {
                path: '/person',
                name: 'person',
                meta: {
                    title: '个人中心'
                },
                component: () => import('@/view/Person.vue')
            },
            {
                path: '/setting',
                name: 'setting',
                meta: {
                    title: '账户设置'
                },
                component: () => import('../view/Setting.vue')
            }
        ]
    }
]