/*
 * @Author: Parker 
 * @Date: 2019-05-05 16:24:40 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-05 16:25:14
 * @Types 后台默认界面
 */

<template>
    <div class="Main">
        <user-item></user-item>
        <div class="Back-Content">
            <a-row :gutter="16">
                <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
                    <Chain></Chain>
                    <Trend></Trend>
                </a-col>
                <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
                    <Chart></Chart>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import UserItem from '@/components/Main/UserItem'
import Trend from '@/components/Main/Trend'
import Chain from '@/components/Main/Chain'
import Chart from '@/components/Main/Chart'

export default {
    components: {
        Trend,
        Chain,
        Chart,
        UserItem
    }
}
</script>


<style lang="stylus" scoped>
.Main {
    margin 0 -24px
    min-width 620px
    flex 1
    display flex
    flex-direction column
    .Back-Content{
        margin 16px 16px 0
        flex 1
        display flex
        flex-direction column
        // background #ffffff
        // padding 16px  
    }
}
</style>
