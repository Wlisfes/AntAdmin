<!--
 * @Author: 情雨随风
 * @Date: 2019-06-15 17:53:51
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-15 18:45:36
 * @Description: 友链管理>GitHub
 -->


<template>
    <div class="root">
        <Head title="GitHub"></Head>
        <div class="Back-Content">
            GitHub
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
