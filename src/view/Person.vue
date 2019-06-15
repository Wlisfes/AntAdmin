<!--
 * @Author: 情雨随风
 * @Date: 2019-06-15 17:58:46
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-15 18:46:30
 * @Description: 账户>个人中心
 -->


<template>
    <div class="root">
        <Head title="个人中心"></Head>
        <div class="Back-Content">
            个人中心
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
