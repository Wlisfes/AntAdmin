/*
 * @Author: Parker 
 * @Date: 2019-05-05 16:22:13 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-09 00:01:26
 * @Types 项目管理>项目列表界面
 */

<template>
    <div id="Thin">
        <Head title="项目列表"></Head>
        <div class="Back-Content">
            <!-- 搜索 start -->
            <a-form layout="inline" style="margin-bottom: 12px;">
                <a-form-item label='开发用户'>
                    <a-select placeholder='请选择' v-model="search.user" style="min-width: 174px;">
                        <a-select-option value="lisfes">lisfes</a-select-option>
                        <a-select-option value="CNinc">CNinc</a-select-option>
                        <a-select-option value="茂茂">茂茂</a-select-option>
                        <a-select-option value="nodemirai">nodemirai</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label='项目类型'>
                    <a-select placeholder='请选择' v-model="search.types" style="min-width: 174px;">
                        <a-select-option value="Vue">
                            Vue
                        </a-select-option>
                        <a-select-option value="React">
                            React
                        </a-select-option>
                        <a-select-option value="Nodejs">
                            Nodejs
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label='使用状态'>
                    <a-select placeholder='请选择' v-model="search.status" style="min-width: 174px;">
                        <a-select-option value="true">
                            <a-icon type="check-circle" style="color: #04be02" />
                            已发布
                        </a-select-option>
                        <a-select-option value="false">
                            <a-icon type="exclamation-circle" style="color: #1890ff" />
                            已关闭
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-button type="primary" style="margin: 3.5px 6px 0"  icon='plus-circle' @click="handleNew">
                    新增
                </a-button>
                <a-button icon='scan' type="primary"  style="margin: 3.5px 6px 0" html-type="submit" @click="handleSearch">
                    查询
                </a-button>
                <a-button icon='sync' style="margin: 3.5px 6px 0" @click="handleReset">
                    重置
                </a-button>
            </a-form>
            <!-- 搜索 end -->

            <!-- 列表 start -->
            <div style="flex: 1;position: relative;">
                <a-row :gutter="24">
                    <a-col :sm="24" :md="12" :xl="8" :xxl="6" v-for="r in rowul" :key="r.id">
                        <a-card hoverable style="width: 100%; margin-top: 14px;">
                            <template class="ant-card-actions" slot="actions">
                                <a-dropdown>
                                    <a-menu slot="overlay">
                                        <a-menu-item key="1" @click="setting({ key: 1, id: r.id })">
                                            <a-icon type="check-circle" style="color: #04be02" />
                                            发布
                                        </a-menu-item>
                                        <a-menu-item key="2" @click="setting({ key: 2, id: r.id })">
                                            <a-icon type="exclamation-circle" style="color: #1890ff" />
                                            关闭
                                        </a-menu-item>
                                        <a-menu-item key="3" @click="setting({ key: 3, id: r.id })">
                                            <a-icon type="delete" style="color: #f5222d" />
                                            删除
                                        </a-menu-item>
                                    </a-menu>
                                    <a-icon type="setting" />
                                </a-dropdown>
                                <a-tooltip placement="top" >
                                    <template slot="title">
                                        <span>编辑</span>
                                    </template>
                                    <a-icon type="edit" @click="edit(r)" />
                                </a-tooltip>
                                <a-tooltip placement="top" >
                                    <template slot="title">
                                        <span>GitHub</span>
                                    </template>
                                    <a :href="r.github" target="_blank">
                                        <a-icon type="github" />
                                    </a>
                                </a-tooltip>
                                <a-tooltip placement="top" >
                                    <template slot="title">
                                        <span>预览</span>
                                    </template>
                                    <a :href="r.viewUrl || r.github" target="_blank">
                                        <a-icon type="eye" />
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
                            <a-tag color="blue" style="margin-top: 12px;">Vue</a-tag>
                        </a-card>
                    </a-col>
                </a-row>
            </div>
            <!-- 列表 end -->
        </div>

        <!-- 编辑弹窗 start -->
        <a-modal
            title="项目编辑"
            v-model="editModal.visible"
            @ok="handleOk"
            okText="确定"
            cancelText="取消"
        >
            <a-form>
                <a-form-item v-bind="formItemLayout" label="Title">
                    <a-input v-model="editModal.title" />
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="Avatar">
                    <a-input v-model="editModal.Avatar" />
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="GitHub">
                    <a-input v-model="editModal.github" />
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="viewUrl">
                    <a-input v-model="editModal.viewUrl" />
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="Contenr">
                    <a-input v-model="editModal.content" />
                </a-form-item>
            </a-form>
        </a-modal>
        <!-- 编辑弹窗 end -->

        <!-- 新增弹窗 start -->
        <a-modal
            title="新增项目"
            v-model="pushModal.visible"
            @ok="handleOk"
            okText="确定"
            cancelText="取消"
        >
            <a-form>
                <a-form-item v-bind="formItemLayout" label="Title">
                    <a-input v-model="pushModal.title" placeholder='请输入项目标题' />
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="Avatar">
                    <a-input v-model="pushModal.Avatar" placeholder='请输入项目标题' />
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="GitHub">
                    <a-input v-model="pushModal.github" />
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="viewUrl">
                    <a-input v-model="pushModal.viewUrl" />
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="Contenr">
                    <a-input v-model="pushModal.content" />
                </a-form-item>
            </a-form>
        </a-modal>
        <!-- 新增弹窗 end -->
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
                    viewUrl: '',
                    Avatar: 'https://avatars3.githubusercontent.com/u/32263302?s=460&v=4'
                },
                {
                    id: 1556951115728,
                    title: 'CNine',
                    content: Txt,
                    status: true,
                    github: 'https://github.com/Aysnine',
                    viewUrl: '',
                    Avatar: 'https://avatars2.githubusercontent.com/u/10137653?s=460&v=4'
                },
                {
                    id: 1556951115729,
                    title: '茂茂',
                    content: Txt,
                    status: false,
                    github: 'https://github.com/maomao1996',
                    viewUrl: '',
                    Avatar: 'https://avatars1.githubusercontent.com/u/24606443?s=460&v=4'
                },
                {
                    id: 1556951115730,
                    title: 'nodemirai',
                    content: Txt,
                    status: true,
                    github: 'https://github.com/NodeMirai',
                    viewUrl: '',
                    Avatar: 'https://avatars0.githubusercontent.com/u/20881290?s=460&v=4'
                },
                {
                    id: 1556951115731,
                    title: 'Nzix',
                    content: Txt,
                    status: true,
                    github: 'https://github.com/nondanee',
                    viewUrl: '',
                    Avatar: 'https://avatars2.githubusercontent.com/u/26399680?s=460&v=4'
                },
                {
                    id: 1556951115732,
                    title: 'chanshiyu',
                    content: Txt,
                    status: false,
                    github: 'https://github.com/chanshiyucx',
                    viewUrl: '',
                    Avatar: 'https://avatars0.githubusercontent.com/u/22583039?s=460&v=4'
                },
                {
                    id: 1556951115733,
                    title: 'Evan You',
                    content: Txt,
                    status: true,
                    github: 'https://github.com/yyx990803',
                    viewUrl: '',
                    Avatar: 'https://avatars2.githubusercontent.com/u/499550?s=460&v=4'
                },
                {
                    id: 1556951115734,
                    title: '花裤衩',
                    content: Txt,
                    status: true,
                    github: 'https://github.com/PanJiaChen',
                    viewUrl: '',
                    Avatar: 'https://avatars2.githubusercontent.com/u/8121621?s=460&v=4'
                },
                {
                    id: 1556951115735,
                    title: 'Modog',
                    content: Txt,
                    status: false,
                    github: 'https://github.com/GabrielModog',
                    viewUrl: '',
                    Avatar: 'https://avatars3.githubusercontent.com/u/1420545?s=460&v=4'
                },
                {
                    id: 1556951115736,
                    title: 'Jialin Wu',
                    content: Txt,
                    status: false,
                    github: 'https://github.com/jialin-wu-02',
                    viewUrl: '',
                    Avatar: 'https://avatars0.githubusercontent.com/u/44333110?s=460&v=4'
                }
            ],
            //搜索配置
            search: {
                user: '',
                status: '',
                types: ''
            },
            
            //编辑弹窗配置
            editModal: {
                visible: false,
                title: '',
                Avatar: '',
                id: null,
                content: '',
                viewUrl: '',
                github: ''
            },
            //新增弹窗配置
            pushModal: {
                visible: false,
                title: '',
                Avatar: '',
                id: null,
                content: '',
                viewUrl: '',
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
        //搜索
        handleSearch() {
            let rowul = this.rowul
            let { status, user } = this.search
            
            const hide = this.$message.loading('查询中  ···', 0)
            setTimeout(hide, 5000)
        },
        //重置
        handleReset() {
            this.search.status = ''
            this.search.user = ''
        },
        //设置
        setting({ key, id }) {
            let rowul = this.rowul
            if(key == 1 || key == 2) {
                this.rowul = rowul.map(item => {
                    if(item.id === id) {
                        key == 1 ? item.status = true : item.status = false
                    }
                    return item
                })
            }
            
        },
        //编辑
        edit({ Avatar,content,github,id,title,viewUrl }) {
            this.editModal.Avatar = Avatar
            this.editModal.content = content
            this.editModal.github = github
            this.editModal.id = id
            this.editModal.title = title
            this.editModal.visible = true
        },
        //编辑确定
        handleOk() {
            let rowul = this.rowul
            let editModal = this.editModal
            
            this.rowul = rowul.map(item => {
                return item.id === editModal.id ? editModal : item
            })
            this.editModal.visible = false
        },
        //新增
        handleNew() {
            this.pushModal.visible = true
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
        display flex
        flex-direction column
        background #ffffff
        padding 24px 24px
        .card-Title {
            height 64px
            word-wrap break-word
            overflow hidden
            display -webkit-box
            -webkit-box-orient vertical
            -webkit-line-clamp 3
        }
        .ant-card-actions {
            .anticon {
                font-size 16px
                padding 0 14px
            }
        }
    }
}
</style>


