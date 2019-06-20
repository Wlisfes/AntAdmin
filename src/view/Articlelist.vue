/*
 * @Author: Parker 
 * @Date: 2019-05-05 16:14:51 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-07 23:29:21
 * @Types 文章管理>文章列表界面
 */



<template>
    <div class="root">
        <Head title="文章列表"></Head>
        <div class="Back-Content">
            <find
                :plusvisible="false"
                @find="findCollBack"
                @plus="pluscollBack"
                @reply="replycollBack"
            ></find>

            <a-table
                :columns="TableColumns"
                :dataSource="TableData"
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

        <!-- 文章编辑弹窗 -->
        <article-edit-form
            :visible="editModal.visible"
            :id="editModal.id"
            :name="editModal.name"
            :tags="editModal.tags"
            :Text="editModal.Text"
            :Textvalue="editModal.Textvalue"
            :theme="editModal.theme"
            :weights="editModal.weights"
            :description="editModal.description"
            @cancel="() => { editModal.visible = false }"
            @create="editEnd"
        ></article-edit-form>
    </div>
</template>

<script>
import Head from '@/components/common/Head';
import Find from '@/components/common/Find';
import ArticleEditForm from '@/components/common/ArticleEditForm';
import { statusType,statusText } from '@/lib/filters';

const TableColumns = [
    {
        title: '文章名称',
        dataIndex: 'name',
        width: 180,
        fixed: 'left',
        scopedSlots: { customRender: 'name' }
    },
    {
        title: '文章作者',
        dataIndex: 'author',
        width: 90
    },
    {
        title: '文章描述',
        dataIndex: 'description'
    },
    {
        title: '类别标签',
        dataIndex: 'tags',
        width: 300,
        scopedSlots: { customRender: 'tags' }
    },
    {
        title: '创建时间',
        dataIndex: 'createdAt',
        width: 100,
        align: 'center',
        scopedSlots: { customRender: 'createdAt' }
    },
    {
        title: '文章状态',
        dataIndex: 'status',
        align: 'center',
        width: 75,
        scopedSlots: { customRender: 'status' }
    },
    {
        title: '文章操作',
        dataIndex: 'operation',
        align: 'center',
        width: 280,
        fixed: 'right',
        scopedSlots: { customRender: 'operation' }
    }
]


export default {
    data() {
        return {
            //表格配置
            loading: false,
            TableData: [],
            TableColumns,

            //编辑弹窗配置
            editModal: {
                visible: false,
                id: '',
                name: '',
                tags: [],
                Text: '',
                Textvalue: '',
                theme: '',
                weights: 1,
                read: 1,
                suki: 1,
                description: ''
            }
        }
    },
    created() {
        this.__getArticleListFn()
    },
    filters: {
        statusType: (v) => statusType(v),
        statusText: (v) => statusText(v)
    },
    methods: {
        //查询回调
        findCollBack(e) {
            this.FindWhereArticleFn(e)
        },
        //新增回调
        pluscollBack() {
            this.pushModal.visible = true
        },
        //重置回调
        replycollBack() {
            this.__getArticleListFn()
        },
        //查询
        async FindWhereArticleFn(findData) {
            try {
                this.loading = true
                let res = await this.Api.FindWhereArticleFn({ ...findData })
                if(res.code === 200) {
                    this.TableData = this.TableMap(res.data)
                    this.$notification.success({ message: '查找成功！', duration: 1.5, description: '' })
                }
            } catch (error) {
                console.error(error)
            }
            this.loading = false
        },
        //编辑
        startEdit(row) {
            console.log(row)
            this.editModal.id = row.id
            this.editModal.name = row.name
            this.editModal.tags = row.tags.map(el => el.tagsfirst_id)
            this.editModal.Text = row.Text
            this.editModal.Textvalue = row.Textvalue
            this.editModal.theme = row.theme
            this.editModal.weights = row.weights
            this.editModal.description = row.description
            this.editModal.read = row.read
            this.editModal.suki = row.suki
            this.editModal.visible = true
        },
        //编辑保存
        async editEnd({ id,name,tags,Text,Textvalue,theme,weights,description,read,suki }) {
            try {
                this.loading = true
                this.editModal.visible = false
                let res = await this.Api.UpdateArticle({
                    id,name,tags,Text,Textvalue,theme,weights,description,suki,suki
                })
                if(res.code === 200) {
                    this.TableData = this.TableMap(res.data)
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
                let res = await this.Api.OpenArticleFn({ id })
                if(res.code === 200) {
                    this.TableData = this.TableMap(res.data)
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
                let res = await this.Api.DownArticleFn({ id })
                if(res.code === 200) {
                    this.TableData = this.TableMap(res.data)
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
                let res = await this.Api.DelArticleFn({ id })
                if(res.code === 200) {
                    this.TableData = this.TableMap(res.data)
                    this.$notification.success({ message: '删除成功！', duration: 1.5, description: '' })
                }
            } catch (error) {
                console.error(error)
            }
            this.loading = false
        },
        //获取所有文章列表
        async __getArticleListFn() {
            try {
                this.loading = true
                let res = await this.Api.getArticleListFn()
                if(res.code === 200) {
                    this.TableData = this.TableMap(res.data)

                    console.log(res)
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
                Text: v.Text,
                Textvalue: v.Textvalue,
                author: v.author,
                createdAt: v.createdAt.slice(0,v.createdAt.indexOf('T')),
                description: v.description,
                picture: v.picture,
                read: v.read,
                status: v.status,
                suki: v.suki,
                tags: v.tags,
                theme: v.theme,
                name: v.name,
                weights: v.weights,
                uid: v.uid
            }))
            return v
        }
    },
    components: {
        Head,
        Find,
        ArticleEditForm
    }
}
</script>

<style lang="stylus" scoped>
.root {
    min-width 1212px
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


