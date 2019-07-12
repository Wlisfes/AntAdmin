<!--
 * @Author: 情雨随风
 * @Date: 2019-06-15 17:59:34
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-22 18:39:34
 * @Description: 账户>账户设置
 -->


<template>
    <div class="root">
        <Head title="账户设置"></Head>
        <div class="Back-Content">
            <div class="Basic-menu">
                <a-menu
                    :defaultSelectedKeys="get_SettingMenu"
                    mode="inline"
                    theme="light"
                    style="height:100%;"
                    @select="select"
                >
                    <a-menu-item v-for="ms in menu" :key="ms.key">
                        <router-link :to="ms.path">{{ ms.name }}</router-link>
                    </a-menu-item>
                </a-menu>
            </div>
            <div class="Basic-view">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
import Head from '@/components/common/Head';
import { mapGetters,mapMutations } from 'vuex'
export default {
    data() {
        return {
            menu: [
                { key: '1', path: '/setting/basic', name: '基本设置' },
                { key: '2', path: '/setting/safety', name: '安全设置' },
                { key: '3', path: '/setting/theme', name: '个性化' }
            ]
        }
    },
    computed: {
        ...mapGetters([
            'get_SettingMenu'
        ])
    },
    methods: {
        ...mapMutations([
            'set_SettingMenu'
        ]),
        select(e) {
            this.set_SettingMenu(e.selectedKeys)
        }
    },
    components: {
        Head
    }
}
</script>

<style lang="stylus" scoped>
.root {
    margin 0 -24px
    min-width 800px
    flex 1
    display flex
    flex-direction column
    .Back-Content{
        margin 16px 16px 0
        flex 1
        display flex
        flex-direction row
        background #ffffff
        padding 16px 0
        position relative
        .Basic-menu {
            height 100%
            width 240px
        }
        .Basic-view {
            flex 1
            margin 0 32px
        }
    }
}
</style>
