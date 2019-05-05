/*
 * @Author: Parker 
 * @Date: 2019-05-05 16:22:13 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-05 22:28:48
 * @Types 项目管理>项目列表界面
 */

<template>
    <div id="Thin">
        <Head title="项目列表"></Head>
        <div class="Back-Content">
            <a-row :gutter="24">
                <a-col :sm="24" :md="12" :xl="8" :xxl="6">
                    <a-card hoverable style="width: 100%">
                        <template class="ant-card-actions" slot="actions">
                            <a-icon type="setting" />
                            <a-icon type="edit" />
                            <a-icon type="github" />
                            <a-icon type="check-circle" />
                        </template>
                        <a-card-meta
                            title="Wlisfes">
                            <a-avatar slot="avatar" src="https://avatars3.githubusercontent.com/u/32263302?s=460&v=4" />
                        </a-card-meta>
                        <div class="card-Title"></div>
                    </a-card>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import Head from '../components/common/Head'
export default {
    data () {
        return {
            
        }
    },
    created () {
        
    },
    methods: {
          
    },
    components: {
        Head
    }
}
</script>

<style lang="stylus" scoped>
#Thin {
    margin 0 -24px
    flex 1
    display flex
    flex-direction column
    .Back-Content{
        margin 24px 24px 0
        flex 1
        background #ffffff
        padding 24px 24px 0
        .card-Title {
            height 64px
            word-wrap break-word
            overflow hidden
            display -webkit-box
            -webkit-box-orient vertical
            -webkit-line-clamp 3
        }
    }
}
</style>


