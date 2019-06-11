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
            <find
                @find="findCollBack"
                @plus="pluscollBack"
                @reply="replycollBack"
            ></find>
    
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
                    <b v-html="row.name"></b>
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

        <!-- 编辑项目弹窗 -->
        <taske-edit-form
            :visible="editModal.visible"
            :id="editModal.id"
            :name="editModal.name"
            :tags="editModal.tags"
            :github="editModal.github"
            :viewUrl="editModal.viewUrl"
            :weights="editModal.weights"
            :description="editModal.description"
            @cancel="() => { editModal.visible = false }"
            @create="(e) => { editEnd(e) }"
        ></taske-edit-form>
    </div>
</template>

<script>
import Head from '@/components/common/Head';
import TaskeCreateForm from '@/components/common/TaskeCreateForm';
import Find from '@/components/common/Find';
import TaskeEditForm from '@/components/common/TaskeEditForm';
import { statusType,statusText } from '@/lib/filters';

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
        width: 300,
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

            //表格配置
            loading: false,
            TableBata: [],
            TableColumns,

            //新增弹窗配置
            pushModal: {
                visible: false,
            },

            //编辑弹窗配置
            editModal: {
                visible: false,
                id: '',
                name: '',
                tags: [],
                github: '',
                viewUrl: '',
                weights: 1,
                description: ''
            }
        }
    },
    created () {
        this.__getTaskeListFn()
    },
    filters: {
        statusType: (v) => statusType(v),
        statusText: (v) => statusText(v)
    },
    methods: {
        //查询回调
        findCollBack(e) {
            this.FindWhereTaskeFn(e)
        },
        //新增回调
        pluscollBack() {
            this.pushModal.visible = true
        },
        //重置回调
        replycollBack() {
            this.__getTaskeListFn()
        },
        //查询
        async FindWhereTaskeFn(findData) {
            try {
                this.loading = true
                let res = await this.Api.FindWhereTaskeFn({ ...findData })
                if(res.code === 200) {
                    this.TableBata = this.TableMap(res.data)
                }
            } catch (error) {
                console.error(error)
            }
            this.loading = false
        },
        //新增项目
        async createTaske({ name,tags,github,viewUrl,weights,description }) {
            try {
                this.loading = true
                this.pushModal.visible = false
                let res = await this.Api.SubmitTaskeFn({
                    name,tags,github,viewUrl,weights,description
                })
                if(res.code === 200) {
                    this.TableBata = this.TableMap(res.data)
                    this.$notification.success({ message: '新增成功！', duration: 1.5, description: '' })
                }
            } catch (error) {
                console.error(error)
            }
            this.loading = false
        },
        //编辑
        startEdit(row) {
            this.editModal.id = row.id
            this.editModal.name = row.name
            this.editModal.tags = row.tags.map(el => el.tagsfirst_id)
            this.editModal.github = row.github
            this.editModal.viewUrl = row.viewUrl
            this.editModal.weights = row.weights
            this.editModal.description = row.description
            this.editModal.visible = true
        },
        //编辑保存
        async editEnd({ id,name,description,github,viewUrl,weights,tags }) {
            try {
                this.loading = true
                this.editModal.visible = false
                let res = await this.Api.UpdateTaske({
                    id,name,description,github,viewUrl,weights,tags
                })
                if(res.code === 200) {
                    this.TableBata = this.TableMap(res.data)
                    this.$notification.success({ message: '修改成功！', duration: 1.5, description: '' })
                }
            } catch (error) {
                console.error(error)
            }
            this.loading = false
        },
        //发布
        async open(id) {
            try {
                this.loading = true
                let res = await this.Api.OpenTaskeFn({ id })
                if(res.code === 200) {
                    this.TableBata = this.TableMap(res.data)
                    this.$notification.success({ message: '发布成功！', duration: 1.5, description: '' })
                }
            } catch (error) {
                console.error(error)
            }
            this.loading = false
        },
        //关闭
        async down(id) {
            try {
                this.loading = true
                let res = await this.Api.DownTaskeFn({ id })
                if(res.code === 200) {
                    this.TableBata = this.TableMap(res.data)
                    this.$notification.success({ message: '关闭成功！', duration: 1.5, description: '' })
                }
            } catch (error) {
                console.error(error)
            }
            this.loading = false
        },
        //删除
        async del(id) {
            try {
                this.loading = true
                let res = await this.Api.DelTaskeFn({ id })
                if(res.code === 200) {
                    this.TableBata = this.TableMap(res.data)
                    this.$notification.success({ message: '关闭成功！', duration: 1.5, description: '' })
                }
            } catch (error) {
                console.error(error)
            }
            this.loading = false
        },

        //获取所有项目列表
        async __getTaskeListFn() {
            try {
                this.loading = true
                let res = await this.Api.getTaskeListFn()
                if(res.code === 200) {
                    this.TableBata = this.TableMap(res.data)
                }
            } catch (error) {
                console.error(error)
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
        Find,
        TaskeEditForm,
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


