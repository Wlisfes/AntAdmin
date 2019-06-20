<!--
 * @Author: 情雨随风
 * @Date: 2019-06-15 17:58:46
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-20 23:49:26
 * @Description: 账户>个人中心
 -->


<template>
    <div class="root">
        <Head title="个人中心"></Head>
        <div class="Back-Content">
            <a-row :gutter="16">
                <a-col :md="24" :lg="7">
                    <a-card :bordered="false">
                    <div class="account-center-avatarHolder">
                        <div class="avatar">
                            <img src="https://avatars3.githubusercontent.com/u/32263302?s=460&v=4">
                        </div>
                        <div class="username">情雨随风</div>
                        <div class="bio">海纳百川，有容乃大</div>
                    </div>
                    <a-divider/>

                 
                    <a-divider :dashed="true"/>

    
                    </a-card>

                    

                </a-col>
                <a-col :md="24" :lg="17">
                    <a-card
                        style="width:100%"
                        :bordered="false"
                        :tabList="tabListNoTitle"
                        :activeTabKey="noTitleKey"
                        @tabChange="key => handleTabChange(key, 'noTitleKey')"
                    >
                        <Article v-if="noTitleKey == 'article'"></Article>
                    </a-card>
                 </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import Head from '@/components/common/Head';
import Article from '../components/Person/Article'
export default {
    data() {
        return {
            tabListNoTitle: [
                { key: 'article', tab: '文章' },
                { key: 'book', tab: '笔记' },
                { key: 'project', tab: '项目' }
            ],
            noTitleKey: 'article'


        }
    },
    methods: {
        handleTabChange (key, type) {
            this[type] = key
        }
    },
    components: {
        Head,
        Article
    }
}
</script>

<style lang="stylus" scoped>
.root {
    margin 0 -24px
    flex 1
    display flex
    flex-direction column
    transition 0.3s
    .Back-Content{
        margin 16px 16px 0
        flex 1
        display flex
        flex-direction column
        background none

        .account-center-avatarHolder {
            text-align: center;
            margin-bottom: 24px;
            & > .avatar {
                margin: 0 auto;
                width: 104px;
                height: 104px;
                margin-bottom: 20px;
                border-radius: 50%;
                overflow: hidden;
                img {
                    height: 100%;
                    width: 100%;
                }
            }
            .username {
                color: rgba(0, 0, 0, 0.85);
                font-size: 20px;
                line-height: 28px;
                font-weight: 500;
                margin-bottom: 4px;
            }
        }
        
    }
}
</style>
