<!--
 * @Author: 情雨随风
 * @Date: 2019-06-15 19:04:02
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-15 22:29:46
 * @Description: 用户信息展示组件
 -->


<template>
    <div class="UserStyle">
        <a-avatar class="Avatar" :src="'http://localhost:9800' + get_Token.avatar" />
        <div class="title-box">
            <p class="title" v-html="get__timeFix + '，' + get_Token.nickname + '，' + get__welcome"></p>
            <span>菜鸟前端工程师 | 正棋集团 - 某某某事业群 - VUE平台</span>
        </div>
        <a-row class="TableRow">
            <a-col :span="8" class="TableCol">
                <span class="TableIcon">项目数</span>
                <span class="Text">8</span>
            </a-col>
            <a-col :span="8" class="TableCol">
                <span class="TableIcon">标签数</span>
                <span class="Text">15</span>
            </a-col>
            <a-col :span="8" class="TableCol">
                <span class="TableIcon">文章、笔记数</span>
                <span class="Text">16</span>
            </a-col>
        </a-row>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { timeFix,welcome } from '@/lib/Tool'

export default {
    data() {
        return {
            
        }
    },
    created() {
        console.log(this.get_Token)
    },
    computed: {
        ...mapGetters([
            'get_Token'
        ]),
        get__timeFix: () => timeFix(),
        get__welcome: () => welcome()

    },
    methods: {
        
    }
}
</script>

<style lang="stylus" scoped>
.UserStyle {
    padding 16px 24px
    background #ffffff
    display flex
    .Avatar {
        border-radius 72px
        display block
        width 72px
        height 72px
        margin-right 24px
    }
    .title-box {
        flex auto
        .title {
            font-size 20px
            color #262626
            margin-bottom 12px
        }
        span {
            font-size 14px
            color #999
        }
    }
    .TableRow {
        width: 375px;
        height: 100%;
        .TableCol {
            height 100%
            display flex
            flex-direction column
            justify-content center
            .TableIcon {
                color #999
                margin-bottom 4px
            }
            .Text {
                font-size 20px
                color #262626
            }
        }
    }
}
</style>
