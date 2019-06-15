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
    </a-layout-header>
</template>

<script>
export default {
    props: {
        collapsed: {
            type: Boolean
        }
    },
    computed: {
        getWidth() {
            return this.collapsed ? "calc(100% - 80px)" : "calc(100% - 240px)"
        }
    },
    methods: {
        iScoll() {
            this.$emit('iscoll', !this.collapsed)
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
}
</style>

