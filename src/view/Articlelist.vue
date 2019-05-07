/*
 * @Author: Parker 
 * @Date: 2019-05-05 16:14:51 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-07 23:29:21
 * @Types 文章管理>文章列表界面
 */

<template>
    <div class="root">
        <Head title="文章列表"></Head>
        <div class="Back-Content">
            文章列表界面
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

