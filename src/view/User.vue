/*
 * @Author: 情雨随风 
 * @Date: 2019-05-12 12:24:01 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-12 12:24:36
 * @Types 用户注册界面
 */


<template>
    <div class="root">
        <Head title="用户注册"></Head>
        <div class="Back-Content">
            用户注册界面
        </div>
    </div>
</template>

<script>
import Head from '../components/common/Head'
export default {
    components: {
        Head
    }
}
</script>

<style lang="stylus" scoped>
.root {
    margin 0 -24px
    flex 1
    display flex
    flex-direction column
    .Back-Content{
        margin 24px 24px 0
        flex 1
        display flex
        flex-direction column
        background #ffffff
        padding 24px 24px

        
    }
}
</style>