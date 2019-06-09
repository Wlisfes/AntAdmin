/*
 * @Author: Parker 
 * @Date: 2019-05-05 16:19:40 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-11 13:05:51
 * @Types 标签管理>标签列表界面
 */

<template>
    <div id="Tas">
        <Head title="标签列表"></Head>
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
                        <a-select-option value="0">已删除</a-select-option>
                        <a-select-option value="1">已关闭</a-select-option>
                        <a-select-option value="2">已发布</a-select-option>
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
                        @click="pushModal.visible = true"
                    >新增</a-button>
                </a-form-item>
                <a-form-item>
                    <a-button
                        @click="Reset"
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
            >
                
                <template slot="name" slot-scope="text, row">
                    <a-tag :color="row.color" v-html="row.name"></a-tag>
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

        <!-- 新增弹窗 start -->
        <tas-create-form
            :visible="pushModal.visible"
            @cancel="pushModal.visible = false"
            @create="(e) => { CreateTagsFn(e) }"
        ></tas-create-form>

        <!-- 编辑弹窗 start -->
        <tas-edit-form
            :visible="editModal.visible"
            :id="editModal.id"
            :name="editModal.name"
            :color="editModal.color"
            :weights="editModal.weights"
            :description="editModal.description"
            @cancel="editModal.visible = false"
            @create="editEnd"
        ></tas-edit-form>
    </div>
</template>

<script>
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import Head from '@/components/common/Head';
import TasCreateForm from '@/components/common/TasCreateForm';
import TasEditForm from '@/components/common/TasEditForm';

const TableColumns = [
    {
        title: '标签名称',
        dataIndex: 'name',
        width: 120,
        scopedSlots: { customRender: 'name' }
    },
    {
        title: '标签作者',
        dataIndex: 'author',
        width: 90
    },
    {
        title: '标签描述',
        dataIndex: 'description'
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        width: 100,
        scopedSlots: { customRender: 'createdAt' }
    },
    {
        title: '标签状态',
        dataIndex: 'status',
        align: 'center',
        width: 75,
        scopedSlots: { customRender: 'status' }
    },
    {
        title: '标签操作',
        dataIndex: 'operation',
        align: 'center',
        width: 280,
        scopedSlots: { customRender: 'operation' }
    }
]


export default {
    data () {
        return {
            form: this.$form.createForm(this),

            //表格配置
            loading: false,
            TableBata: [],
            TableColumns,

            //作者列表
            Author: [],
            

            //新增弹窗配置
            pushModal: {
                visible: false,
            },
            //编辑弹窗配置
            editModal: {
                visible: false,
                id: '',
                name: '',
                color: '',
                weights: 1,
                description: ''
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
    created() {
        this.getUserListFn()
        this.getTagsListFn()


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
        },
        createDate1(v) {
            return v.slice(1)
        }
    },
    methods: {
        //重置
        Reset() {
            this.form.resetFields()
            this.getTagsListFn()
        },
        //查询数据过滤
        handleSubmit (e) {
            e.preventDefault();
            this.form.validateFields((err, fieldsValue) => {
                if(err) return
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
                this.FindWhereTagsFn(data)
            })
        },
        //查询
        async FindWhereTagsFn(rul) {
            try {
                this.loading = true
                let res = await this.Api.FindWhereTagsFn({ ...rul })
                if(res.code === 200) {
                    this.TableBata = this.TableMap(res.data)
                }
                else if(res.code === 403){
                    this.$notification.info({ message: '未登录！', duration: 1.5, description: '' })
                }
                else {
                    this.$notification.error({ message: '查询失败！', duration: 1.5, description: '' })
                }
            } catch (error) {
                this.$notification.error({ message: '查询失败！', duration: 1.5, description: '' })
            }

            this.loading = false
        },
        //新增标签确定回调
        async CreateTagsFn({ name, color, description, weights }) {
            try {
                this.loading = true
                this.pushModal.visible = false

                let res = await this.Api.SubmitTagsFn({
                    name, color, description, weights
                })
                if(res.code === 200) {
                    this.TableBata = this.TableMap(res.data)
                    this.$notification.success({ message: '新增成功！', duration: 1.5, description: '' })
                }
                else if(res.code === 403){
                    this.$notification.info({ message: '未登录！', duration: 1.5, description: '' })
                }
                else {
                    this.$notification.error({ message: '新增失败！', duration: 1.5, description: '' })
                }
            } catch (error) {
                this.$notification.error({ message: '新增失败！', duration: 1.5, description: '' })
            }

            this.loading = false
        },
        //编辑
        async startEdit(row) {
            this.editModal.id = row.id
            this.editModal.name = row.name
            this.editModal.color = row.color
            this.editModal.weights = row.weights
            this.editModal.description = row.description
            this.editModal.visible = true
        },
        //编辑保存
        async editEnd({ id, name, color, description, weights }) {
            try {
                this.loading = true
                this.editModal.visible = false
                let res = await this.Api.UpdateTags({
                    id, name, color, description, weights
                })
                if(res.code === 200) {
                    this.TableBata = this.TableMap(res.data)
                    this.$notification.success({ message: '修改成功！', duration: 1.5, description: '' })
                }
            } catch (error) {
                
            }

            this.loading = false
        },
        //发布
        async open(id) {
            try {
                this.loading = true
                let res = await this.Api.OpenTagsFn({ id })
                if(res.code === 200) {
                    this.TableBata = this.TableMap(res.data)
                    this.$notification.success({ message: '发布成功！', duration: 1.5, description: '' })
                }
            } catch (error) {
                
            }

            this.loading = false
        },
        //关闭
        async down(id) {
            try {
                this.loading = true
                let res = await this.Api.DownTagsFn({ id })
                if(res.code === 200) {
                    this.TableBata = this.TableMap(res.data)
                    this.$notification.success({ message: '关闭成功！', duration: 1.5, description: '' })
                }
                
            } catch (error) {
                
            }

            this.loading = false
        },
        //删除
        async del(id) {
            try {
                this.loading = true
                let res = await this.Api.DelTagsFn({ id })
                if(res.code === 200) {
                    this.TableBata = this.TableMap(res.data)
                    this.$notification.success({ message: '删除成功！', duration: 1.5, description: '' })
                }
                
            } catch (error) {
                
            }

            this.loading = false
        },
        //获取所有标签
        async getTagsListFn() {
            try {
                this.loading = true
                let res = await this.Api.getTagsListFn()
                if (res.code === 200) {
                    this.TableBata = this.TableMap(res.data)
                }
            } catch (error) {
                console.log(error)
            }

            this.loading = false
        },
        //表格数据格式化
        TableMap(arr) {
            if(!Array.isArray(arr)) return [];
            let v = arr.map(v => ({
                key: v.id,
                id: v.id,
                name: v.name,
                author: v.author,
                description: v.description,
                status: v.status,
                color: v.color,
                createdAt: v.createdAt.slice(0,v.createdAt.indexOf('T')),
                uid: v.uid,
                weights: v.weights
            }))
            return v
        },
        //用户列表
        async getUserListFn() {
            try {
                let res = await this.Api.getUserListFn()
                if (res.code === 200) {
                    this.Author = res.data
                }
            } catch (error) {
                console.log(error.toString())
            }
        }
    },
    components: {
        Head,
        TasCreateForm,
        TasEditForm
    }
}
</script>

<style lang="stylus" scoped>
#Tas {
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



