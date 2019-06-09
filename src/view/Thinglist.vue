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
            <a-form
                    layout="inline"
                    :form="form"
                    @submit="handleSubmit"
                    style="margin-bottom:16px;"
                >
                <a-form-item label="作者">
                    <a-select
                        placeholder='请选择'
                        style="min-width: 174px;"
                        v-decorator="['uid']"
                    >
                        <a-select-option
                            :value="au.uid"
                            v-for="au in Author"
                            :key="au.uid"
                        >{{ au.nickname }}</a-select-option>
                    </a-select>

                </a-form-item>
                <a-form-item label="状态">
                    <a-select
                        placeholder='请选择'
                        style="min-width: 174px;"
                        v-decorator="['status']"
                    >
                        <a-select-option value="0">
                            <a-badge status="error" text="已删除" />
                        </a-select-option>
                        <a-select-option value="1">
                            <a-badge status="warning" text="已关闭" />
                        </a-select-option>
                        <a-select-option value="2">
                            <a-badge status="success" text="已发布" />
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="日期">
                    <a-range-picker
                        v-decorator="['rangePicker', {
                            rules: [{ type: 'array' }]
                        }]"
                    >
                        <a-icon slot="suffixIcon" type="smile" />
                    </a-range-picker>
                </a-form-item>
                <a-form-item>
                    <a-button
                        type="primary"
                        icon='search'
                        html-type="submit"
                    >查询</a-button>
                </a-form-item>
                <a-form-item>
                    <a-button
                        type="primary"
                        icon='plus-circle'
                        @click="() => { pushModal.visible = true }"
                    >新增</a-button>
                </a-form-item>
                <a-form-item>
                    <a-button
                       
                        icon='sync'
                    >重置</a-button>
                </a-form-item>
            </a-form>
            
            <a-table
                :columns="TableColumns"
                :dataSource="TableBata"
                bordered
                size="middle"
                :loading="loading"
                :locale="{
                    emptyText: '暂无数据'
                }"
                :scroll="{ x: 1500 }"
            >
                
                <template slot="name" slot-scope="text, row">
                    <a-tag :color="row.color" v-html="row.name"></a-tag>
                </template>
                <template slot="tags" slot-scope="text">
                    <a-tag :color="ke.color" v-for="(ke) in text" :key="ke.id">{{ ke.name }}</a-tag>
                </template>
                <template slot="github" slot-scope="text">
                    <a-tag color="blue" style="margin: 0 auto;">
                        <a :href="text" target="_blank" rel="noopener noreferrer">GitHub</a>
                    </a-tag>
                </template>
                <template slot="createdAt" slot-scope="text">
                    <span v-html="text"></span>
                </template>
                <template slot="status" slot-scope="text">
                    <a-badge
                        :status="text | statusType"
                        :text="text | statusText"
                    ></a-badge>
                </template>
                <template slot="operation" slot-scope="text, row">
                    <el-button size="mini" type="primary" @click="startEdit(row)">编辑</el-button>
                    <el-button
                        @click="open(row.id)"
                        size="mini"
                        type="success"
                    >发布</el-button>
                    <el-button
                        @click="down(row.id)"
                        type="warning"
                        size="mini"
                    >关闭</el-button>
                    <el-button
                        @click="del(row.id)"
                        size="mini"
                        type="danger"
                    >删除</el-button>
                </template>
            </a-table>
        </div>

        <!-- 新增项目弹窗 -->
        <taske-create-form
            :visible="pushModal.visible"
            @cancel="() => { pushModal.visible = false }"
            @create="(e) => { createTaske(e) }"
        ></taske-create-form>


    </div>
</template>

<script>
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import Head from '@/components/common/Head';
import TaskeCreateForm from '@/components/common/TaskeCreateForm'

const TableColumns = [
    {
        title: '项目名称',
        dataIndex: 'name',
        width: 120,
        fixed: 'left',
        scopedSlots: { customRender: 'name' }
    },
    {
        title: '项目作者',
        dataIndex: 'author',
        width: 90
    },
    {
        title: '项目描述',
        dataIndex: 'description'
    },
    {
        title: '类别标签',
        dataIndex: 'tags',
        // width: 80,
        scopedSlots: { customRender: 'tags' }
    },
    {
        title: '源码地址',
        dataIndex: 'github',
        width: 80,
        align: 'center',
        scopedSlots: { customRender: 'github' }
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        width: 100,
        align: 'center',
        scopedSlots: { customRender: 'createdAt' }
    },
    {
        title: '项目状态',
        dataIndex: 'status',
        align: 'center',
        width: 75,
        scopedSlots: { customRender: 'status' }
    },
    {
        title: '项目操作',
        dataIndex: 'operation',
        align: 'center',
        width: 280,
        fixed: 'right',
        scopedSlots: { customRender: 'operation' }
    }
]


export default {
    data () {
        return {
            form: this.$form.createForm(this),

            //作者列表
            Author: [],

            //表格配置
            loading: false,
            TableBata: [],
            TableColumns,

            //新增弹窗配置
            pushModal: {
                visible: false,
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
        this.getUserListFn()
        this.getTaskeListFN()
    },
    filters: {
        statusType(v) {
            if(v == 0)
                return 'error'
            else if(v == 1)
                return 'warning'
            else if(v == 2)
                return 'success'
            else
                return 'default'
        },
        statusText(v) {
            if(v == 0)
                return '已删除'
            else if(v == 1)
                return '已关闭'
            else if(v == 2)
                return '已发布'
            else
                return '错误'
        }
    },
    methods: {
       //查询数据过滤
        handleSubmit (e) {
            e.preventDefault();
            this.form.validateFields((err, fieldsValue) => {
                if(err) return
                console.log(fieldsValue)
                let data = ((props) => {
                    let v = {}
                    for(let k in props) {
                        if(props[k]) {
                            if(k == 'rangePicker') {
                                const t = fieldsValue['rangePicker']
                                v.first = t[0].format('YYYY-MM-DD'),
                                v.last = t[1].format('YYYY-MM-DD')
                            }
                            else {
                                v[k] = props[k]
                            }
                        }
                    }
                    return v
                })(fieldsValue)
                // this.FindWhereTagsFn(data)
            })
        },
        //新增项目
        async createTaske({ name,tags,github,viewUrl,weights,description }) {
            try {
                let res = await this.Api.SubmitTaskeFN({
                    name,tags,github,viewUrl,weights,description
                })

                console.log(res)
            } catch (error) {
                console.error(error)
            }
        },

        //获取所有项目列表
        async getTaskeListFN() {
            try {
                let res = await this.Api.getTaskeListFN()

                if(res.code === 200) {
                    console.log(res)
                    this.TableBata = this.TableMap(res.data)
                }
            } catch (error) {
                console.error(error)
            }
        },
        //用户列表
        async getUserListFn() {
            try {
                let res = await this.Api.getUserListFn()
                if (res.code === 200) {
                    this.Author = res.data
                }
            } catch (error) {
                console.error(error)
            }
        },
        //表格数据格式化
        TableMap(arr) {
            if(!Array.isArray(arr)) return [];
            let v = arr.map(v => ({
                key: v.id,
                id: v.id,
                name: v.name,
                author: v.author,
                avatar: v.avatar,
                description: v.description,
                status: v.status,
                createdAt: v.createdAt.slice(0,v.createdAt.indexOf('T')),
                uid: v.uid,
                weights: v.weights,
                tags: v.tags,
                viewUrl: v.viewUrl,
                github: v.github
            }))
            return v
        }
    },
    components: {
        Head,
        TaskeCreateForm
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
        margin 16px 16px 0
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


