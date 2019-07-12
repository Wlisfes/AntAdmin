<!--
 * @Author: 情雨随风
 * @Date: 2019-06-22 13:03:45
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-22 16:34:30
 * @Description: 账户设置>个性化
 -->


<template>
    <div class="Theme">
        <div class="Theme-title">
            <span>个性化设置</span>
        </div>
        <a-list itemLayout="horizontal">
            <a-list-item>
                <a-list-item-meta description="整体风格配色设置">
                    <a slot="title">风格配色</a>
                </a-list-item-meta>
                <a-switch
                    checkedChildren="白色"
                    unCheckedChildren="暗色"
                    :defaultChecked="get_theme == 'light'"
                    @change="themeChange"
                ></a-switch>
            </a-list-item>
            <a-list-item>
                <a-list-item-meta :description="
                    get_theme == 'light' ? '页面风格配色：白' + '' : '页面风格配色：暗'
                ">
                    <a slot="title">主题色</a>
                </a-list-item-meta>
            </a-list-item>
        </a-list>
    </div>
</template>

<script>
import { mapGetters,mapMutations } from 'vuex'
export default {
    data() {
        return {
            data: [
                {
                    title: '风格配色',
                    description: '整体风格配色设置',
                    switch: true
                },
                {
                    title: '主题色',
                    description: '页面风格配色：',
                    switch: false
                }
            ]
        }
    },
    computed: {
        ...mapGetters([
            'get_theme'
        ])
    },
    methods: {
        ...mapMutations([
            'set_theme'
        ]),
        themeChange(e) {
            let v = e ? 'light' : 'dark'
            this.set_theme(v)
        }
    },
}
</script>

<style lang="stylus" scoped>
.Theme {
    .Theme-title {
        font-weight 500
        color rgba(0,0,0,.85)
        line-height 28px
        font-size 20px
        margin-bottom 12px
    }
}
</style>
