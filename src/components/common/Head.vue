/*
 * @Author: 情雨随风 
 * @Date: 2019-05-05 20:48:59 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-05 22:12:03
 * @Types 页头组件
 */

<template>
    <div class="Head">
        <span class="back" @click="backRouter">
            <a-icon style="font-size: 18px;" type="arrow-left" />
        </span>
        <div class="divider"></div>
        <span class="Title" v-html="title"></span>
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String
        }
    },
    methods: {
        backRouter() {
            history.back()
        }
    }
}
</script>

<style lang="stylus" scoped>
.Head {
    display flex
    background #ffffff
    box-shadow 0 1px 4px rgba(0,21,41,.08)
    padding 8px 14px
    align-items center
    .back {
        padding 12px
        cursor pointer
    }
    .divider {
        height 14px
        width 1px
        background #e8e8e8
        margin-right 14px
    }
    .Title {
        font-size 16px
        font-weight bold
        cursor pointer
    }
}
</style>



