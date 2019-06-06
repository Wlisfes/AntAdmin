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
                <a-form layout="inline" :form="form" style="margin-bottom:16px;">
                    <a-form-item label="作者">
                        <a-select placeholder='请选择' v-model="search.author"  style="min-width: 174px;">
                            <a-select-option value="1">鱿鱼须</a-select-option>
                            <a-select-option value="2">斯图真美</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="状态">
                        <a-select placeholder='请选择' v-model="search.author"  style="min-width: 174px;">
                            <a-select-option value="1">
                                    <a-icon type="check-circle" style="color: #04be02" />
                                    已开放
                                </a-select-option>
                                <a-select-option value="2">
                                    <a-icon type="exclamation-circle" style="color: #1890ff" />
                                    已关闭
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="日期">
                        <a-range-picker @change="pickerChange" >
                            <a-icon slot="suffixIcon" type="smile" />
                        </a-range-picker>
                    </a-form-item>
                    <a-form-item>
                        <a-button type="primary" icon='search' html-type="submit">搜索</a-button>
                    </a-form-item>
                </a-form>
                
                <a-table :columns="columns" :dataSource="data" bordered>
                    <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
                    <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
                    <span slot="tags" slot-scope="tags">
                    <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
                    </span>
                    <span slot="action" slot-scope="text, record">
                    <a href="javascript:;">Invite 一 {{record.name}}</a>
                    <a-divider type="vertical" />
                    <a href="javascript:;">Delete</a>
                    <a-divider type="vertical" />
                    <a href="javascript:;" class="ant-dropdown-link">
                        More actions <a-icon type="down" />
                    </a>
                    </span>
                </a-table>
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
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import Head from '../components/common/Head';

const columns = [{
  dataIndex: 'name',
  key: 'name',
  slots: { title: 'customTitle' },
  scopedSlots: { customRender: 'name' }
}, {
  title: 'Age456',
  dataIndex: 'age',
  key: 'age',
  align: 'center'
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
  scopedSlots: { customRender: 'tags' },
}, {
  title: 'Action',
  key: 'action',
  scopedSlots: { customRender: 'action' },
}];

const data = [];
for(let i = 0; i < 30; i++) {
    data.push({
        key: i,
        name: `刀剑神域`,
        age: i,
        address: '刀剑神域',
        tags: ['React', 'Vue', 'Koa']
    })
}

export default {
    data () {
        return {
            form: this.$form.createForm(this),

            rowul: [],
            //搜索配置
            search: {
                author: '',
            },

            data,
            columns,
            
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
        pickerChange(date, dateString) {
            console.log(date, dateString)
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
        padding 16px 16px
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


