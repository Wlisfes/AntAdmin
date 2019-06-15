/*
 * @Author: Parker 
 * @Date: 2019-05-05 16:13:44 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-07 23:28:53
 * @Types 文章管理>新增文章界面
 */

<template>
    <div class="root">
        <Head title="新增文章"></Head>
        <div class="Back-Content">
            新增文章界面
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
        margin 16px 16px 0
        flex 1
        display flex
        flex-direction column
        background #ffffff
        padding 16px

        
    }
}
</style>

