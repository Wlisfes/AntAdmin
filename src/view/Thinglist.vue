/*
 * @Author: Parker 
 * @Date: 2019-05-05 16:22:13 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-06 00:20:46
 * @Types 项目管理>项目列表界面
 */

<template>
    <div id="Thin">
        <Head title="项目列表"></Head>
        <div class="Back-Content">
            <a-row :gutter="24">
                <a-col :sm="24" :md="12" :xl="8" :xxl="6" v-for="(r,n) in rowul" :key="r.id">
                    <a-card hoverable style="width: 100%; margin-top: 24px;">
                        <template class="ant-card-actions" slot="actions">
                            <a-dropdown>
                                <a-menu slot="overlay" @click="setting(r,n)">
                                    <a-menu-item key="1">
                                        <a-icon type="check-circle" style="color: #04be02" />
                                        发布
                                    </a-menu-item>
                                    <a-menu-item key="2">
                                        <a-icon type="exclamation-circle" style="color: #1890ff" />
                                        关闭
                                    </a-menu-item>
                                    <a-menu-item key="3">
                                        <a-icon type="close-circle" style="color: #f5222d" />
                                        删除
                                    </a-menu-item>
                                </a-menu>
                                <a-icon type="setting" style="padding: 0 24px;"/>
                            </a-dropdown>
                            <a-tooltip placement="top" >
                                <template slot="title">
                                    <span>编辑</span>
                                </template>
                                <a-icon type="edit" @click="edit(r)" style="padding: 0 24px;" />
                            </a-tooltip>
                            <a-tooltip placement="top" >
                                <template slot="title">
                                    <span>GitHub</span>
                                </template>
                                <a :href="r.github" target="_blank">
                                    <a-icon type="github" style="padding: 0 24px;" />
                                </a>
                            </a-tooltip>
                            <a-tooltip placement="top" >
                                <template slot="title">
                                    <span v-html="r.status ? '已发布' : '未发布'"></span>
                                </template>
                                <a-icon :type="r.status ? 'check-circle' : 'exclamation-circle'" 
                                    theme="filled" 
                                    :style="{ color: r.status ? '#04be02' : '#1890ff' }"
                                />
                            </a-tooltip>
                        </template>
                        <a-card-meta
                            :title="r.title">
                            <a-avatar slot="avatar" :src="r.Avatar" />
                        </a-card-meta>
                        <div class="card-Title" v-html="r.content"></div>
                    </a-card>
                </a-col>
            </a-row>
        </div>
        <a-modal
            :title="modal.title"
            v-model="modal.visible"
            @ok="handleOk"
            okText="确定"
            cancelText="取消"
        >
            <a-form>
                <a-form-item v-bind="formItemLayout" label="Avatar">
                    <a-input v-model="modal.Avatar" />
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="GitHub">
                    <a-input v-model="modal.github" />
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="Contenr">
                    <a-input v-model="modal.content" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
import Head from '../components/common/Head'

let Txt = `在中台产品的研发过程中，会出现不同的设计规范和实现方式，但其中往往存在很多类似的页面和组件，这些类似的组件会被抽离成一套标准规范。`
export default {
    data () {
        return {
            rowul: [
                {
                    id: 1556951115727,
                    title: 'lisfes',
                    content: Txt,
                    status: true,
                    github: 'https://github.com/Wlisfes',
                    Avatar: 'https://avatars3.githubusercontent.com/u/32263302?s=460&v=4'
                },
                {
                    id: 1556951115728,
                    title: 'CNine',
                    content: Txt,
                    status: true,
                    github: 'https://github.com/Aysnine',
                    Avatar: 'https://avatars2.githubusercontent.com/u/10137653?s=460&v=4'
                },
                {
                    id: 1556951115729,
                    title: '茂茂',
                    content: Txt,
                    status: false,
                    github: 'https://github.com/maomao1996',
                    Avatar: 'https://avatars1.githubusercontent.com/u/24606443?s=460&v=4'
                },
                {
                    id: 1556951115730,
                    title: 'nodemirai',
                    content: Txt,
                    status: true,
                    github: 'https://github.com/NodeMirai',
                    Avatar: 'https://avatars0.githubusercontent.com/u/20881290?s=460&v=4'
                },
                {
                    id: 1556951115731,
                    title: 'Nzix',
                    content: Txt,
                    status: true,
                    github: 'https://github.com/nondanee',
                    Avatar: 'https://avatars2.githubusercontent.com/u/26399680?s=460&v=4'
                },
                {
                    id: 1556951115732,
                    title: 'chanshiyu',
                    content: Txt,
                    status: false,
                    github: 'https://github.com/chanshiyucx',
                    Avatar: 'https://avatars0.githubusercontent.com/u/22583039?s=460&v=4'
                },
                {
                    id: 1556951115733,
                    title: 'Evan You',
                    content: Txt,
                    status: true,
                    github: 'https://github.com/yyx990803',
                    Avatar: 'https://avatars2.githubusercontent.com/u/499550?s=460&v=4'
                },
                {
                    id: 1556951115734,
                    title: '花裤衩',
                    content: Txt,
                    status: true,
                    github: 'https://github.com/PanJiaChen',
                    Avatar: 'https://avatars2.githubusercontent.com/u/8121621?s=460&v=4'
                },
                {
                    id: 1556951115735,
                    title: 'Modog',
                    content: Txt,
                    status: false,
                    github: 'https://github.com/GabrielModog',
                    Avatar: 'https://avatars3.githubusercontent.com/u/1420545?s=460&v=4'
                },
                {
                    id: 1556951115736,
                    title: 'Jialin Wu',
                    content: Txt,
                    status: false,
                    github: 'https://github.com/jialin-wu-02',
                    Avatar: 'https://avatars0.githubusercontent.com/u/44333110?s=460&v=4'
                }
            ],

            //弹窗配置
            modal: {
                visible: false,
                title: '',
                Avatar: '',
                id: null,
                content: '',
                github: ''
            },
            formItemLayout: {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 3 }
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 21 }
                },
            }
        }
    },
    created () {
        // this.getThingList()
    },
    methods: {
        async getThingList() {
            try {
                var res = await this.Api.getThingList()
            } catch (error) {
                this.$message.error(error)
                return
            }

            if (res.code === 200) {
                this.rowul = res.data
            }        
        },
        //设置
        setting(e, n, $event) {
            console.log(e,n,$event)
        },
        //编辑
        edit({ Avatar,content,github,id,title }) {
            this.modal.Avatar = Avatar
            this.modal.content = content
            this.modal.github = github
            this.modal.id = id
            this.modal.title = title
            this.modal.visible = true
        },
        //编辑确定
        handleOk() {
            let { Avatar,content,github,id,title } = this.modal
            this.modal.visible = false
        }
        
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
        padding 0 24px 24px
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


