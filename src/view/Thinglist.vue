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
            
            <div style="flex: 1;position: relative;">
                <div v-for="k in 200" :key="k" v-html="k"></div>
            </div>
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
                <a-form-item v-bind="formItemLayout" label="GitHub">
                    <a-input v-model="pushModal.github" placeholder='请输入Github地址' />
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="viewUrl">
                    <a-input v-model="pushModal.viewUrl" placeholder='请输入预览地址' />
                </a-form-item>
                <a-form-item v-bind="formItemLayout" label="Contenr">
                    <a-input v-model="pushModal.content" placeholder='请输入项目描述' />
                </a-form-item>
            </a-form>
        </a-modal>
        <!-- 新增弹窗 end -->
    </div>
</template>

<script>
import Head from '../components/common/Head'
export default {
    data () {
        return {
            rowul: [],
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


