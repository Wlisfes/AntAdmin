/*
 * @Author: Parker 
 * @Date: 2019-05-05 13:27:21 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-17 17:06:11
 * @Types 侧边栏组件
 */

<template>
    <a-layout-sider 
        id="Sider"
        :trigger="null"
        :collapsible="true"
        :width="256"
        theme="light"
        :collapsed="collapsed"
        breakpoint="xl"
        @breakpoint="iSpoint"
    >
        <div class="logo">
            <router-link to="/">
                <img src="https://avatars3.githubusercontent.com/u/32263302?s=460&v=4" />
            </router-link>
        </div>
        <a-menu theme="light" 
                mode="inline" 
                :openKeys="openKeys"
                :defaultSelectedKeys="defaultSelectedKeys"
                @openChange="onOpenChange"
                style="border-right: none;">
            <a-sub-menu v-for="m in Menu" :key="m.key">
                <span slot="title"><a-icon style="font-size: 16px;" :type="m.icon" /><span v-html="m.title"></span></span>
                <a-menu-item v-for="c in m.children" :key="c.key">
                    <router-link :to="c.path">{{ c.title }}</router-link>
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
    </a-layout-sider>
</template>

<script>
export default {
    props: {
        collapsed: {
            type: Boolean
        }
    },
    data () {
        return {
            Menu: [
                {
                    key: '0',
                    icon: 'dashboard',
                    title: '主页',
                    children: [
                        { key: '0-1', title: '首页', path: '/' }
                    ]
                },
                {
                    key: '1',
                    icon: 'dashboard',
                    title: '用户管理',
                    children: [
                        { key: '1-1', title: '用户列表', path: '/userlist' },
                        { key: '1-2', title: '用户注册', path: '/user' }
                    ]
                },
                {
                    key: '2',
                    icon: 'read',
                    title: '文章管理',
                    children: [
                        { key: '2-1', title: '文章列表', path: '/articlelist' },
                        { key: '2-2', title: '新增文章', path: '/article' }
                    ]
                },
                {
                    key: '3',
                    icon: 'schedule',
                    title: '笔记管理',
                    children: [
                        { key: '3-1', title: '笔记列表', path: '/noteslist' },
                        { key: '3-2', title: '新增笔记', path: '/notes' }
                    ]
                },
                {
                    key: '4',
                    icon: 'tag',
                    title: '标签管理',
                    children: [
                        { key: '4-1', title: '标签列表', path: '/taslist' }
                    ]
                },
                {
                    key: '5',
                    icon: 'profile',
                    title: '项目管理',
                    children: [
                        { key: '5-1', title: '项目列表', path: '/thinglist' }
                    ]
                }
            ],
            openKeys: ['0'],
            defaultSelectedKeys: ['0-1']
        }
    },
    methods: {
        iSpoint(e) {
            this.$emit('ispoint', e)
        },
        onOpenChange (openKeys) {
            const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
            const menu = this.Menu.map(el => el.key)
            if (menu.indexOf(latestOpenKey) === -1) {
                this.openKeys = openKeys
            } else {
                this.openKeys = latestOpenKey ? [latestOpenKey] : []
            }
        }
    }

    
}
</script>

<style lang="stylus" scoped>
#Sider {
    overflow-x hidden
    overflow-y auto
    height 100vh
    position fixed
    left 0
    top 0
    border-right 1px solid rgba(210,210,210,.3)
    
    .logo {
        padding 24px 0
        img {
            width 60%
            border-radius 100%
            display block
            margin 0 auto
            cursor pointer
        }
    }
}
</style>

