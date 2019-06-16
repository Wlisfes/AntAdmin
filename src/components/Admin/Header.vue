/*
 * @Author: Parker 
 * @Date: 2019-05-05 13:32:05 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-05 23:31:35
 * @Types 导航栏组件
 */

<template>
    <a-layout-header id="Header" :style="{ width: getWidth }">
        <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="iScoll"
        />

        <div class="user-wrapper">
            <div class="content-box">
                <a-badge count='10'>
                    <a-icon type="bell" style="font-size: 24px;" />
                </a-badge>
                <a-dropdown
                    :style="{
                        height: '100%',
                        display: 'inline-block',
                        marginLeft: '20px'
                    }"
                >
                    <span class="action ant-dropdown-link user-dropdown-menu">
                        <a-avatar class="avatar" :src="get_Token.avatar || 'http://admin.lisfes.cn/server/static/assets/album/515b52bc8f191.png'"/>
                        <span>情雨随风</span>
                    </span>
                    <a-menu slot="overlay" style="width: 160px;">
                        <a-menu-item @click="select('person')">
                            <router-link to="/person">
                                <a-icon type="user"/>
                                <span :style="Style">个人中心</span>
                            </router-link>
                        </a-menu-item>
                        <a-menu-item @click="select('setting')">
                            <router-link to="/setting">
                                <a-icon type="setting"/>
                                <span :style="Style">账户设置</span>
                            </router-link>
                        </a-menu-item>
                        <a-menu-item>
                            <a href="https://github.com/Wlisfes/AntAdmin" target="_blank" rel="noopener noreferrer">
                                <a-icon type="project" />
                                <span :style="Style">项目地址</span>
                            </a>
                        </a-menu-item>
                        <a-menu-item disabled>
                            <a-icon type="wifi" />
                            <span>测试</span>
                        </a-menu-item>
                        <a-menu-divider/>
                        <a-menu-item key="3" @click="logOut">
                            <a-icon type="logout"/>
                            <span>退出登录</span>
                        </a-menu-item>
                    </a-menu>
                </a-dropdown>


                
            </div>
        </div>
    </a-layout-header>
</template>

<script>
import { mapMutations,mapGetters } from 'vuex'
export default {
    props: {
        collapsed: {
            type: Boolean
        }
    },
    data() {
        return {
            menu: [
                { icon: 'setting', Text: '个人中心' },
                { icon: 'setting', Text: '账户设置' },
                { icon: 'setting', Text: '账户设置' },
                { icon: 'setting', Text: '退出' }
            ]
        }
    },
    computed: {
        ...mapGetters([
            'get_Token'
        ]),
        getWidth() {
            return this.collapsed ? "calc(100% - 80px)" : "calc(100% - 240px)"
        },
        Style: () => ({
            marginLeft: '12px'
        })
    },
    methods: {
        ...mapMutations([
            'set_openKeys',
            'set_selectedKeys',
            'set_defaultSelectedKeys'
        ]),
        iScoll() {
            this.$emit('iscoll', !this.collapsed)
        },
        //选择个人或者账户设置
        select(key) {
            let menu = {}
            switch (key) {
                case 'person':
                    menu.openKeys = ['7']
                    menu.Keys = ['7-1']
                    break;
                case 'setting':
                    menu.openKeys = ['7']
                    menu.Keys = ['7-2']
                    break;
            }
            this.set_openKeys(menu.openKeys)
            this.set_selectedKeys(menu.Keys)
            this.set_defaultSelectedKeys(menu.Keys)
        },
        //提示弹窗
        confirm() {
            return new Promise((resolve, reject) => {
                this.$confirm({
                    title: '提示',
                    content: '真的需要注销登录吗？',
                    cancelText: '取消',
                    okText: '确定',
                    onOk: () => resolve(true),
                    onCancel: () => reject(false)
                })
            })
        },
        //退出登录
        async logOut() {
            try {
                await this.confirm()
                let res = await this.Api.logOutFn()

                if(res.code === 200) {
                    this.Aux.removesetStore()
                    this.$notification.success({ message: '退出成功！', duration: 1.5, description: '' })
                    this.$router.replace({ path: `/login` })
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
#Header {
    background #ffffff
    padding 0 12px 0 0
    transition width .2s
    position fixed
    top 0
    right 0
    z-index 9
    box-shadow 0 1px 4px rgba(0,21,41,.08)

    .trigger {
        font-size 18px
        line-height 64px
        padding 0 24px
        cursor pointer
        transition: color .3s;
        &:hover {
            color #1890ff
        }
    }
    .user-wrapper {
        height 100%
        float right 
        cursor pointer
        .avatar {
            margin-right 12px
        }
        .content-box {
            height 64px
            padding 0 12px
            display flex
            align-items center
        }
    }
}
</style>

