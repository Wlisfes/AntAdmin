/*
 * @Author: Parker 
 * @Date: 2019-05-05 16:17:40 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-07 23:26:41
 * @types 笔记管理>笔记列表界面
 */

<template>
    <div class="root">
        <Head title="笔记列表"></Head>
        <div class="Back-Content">
            <find
                :plusvisible="false"
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

        <!-- 笔记编辑弹窗 -->
        <notes-edit-form
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
        ></notes-edit-form>
    </div>
</template>

<script>
import Head from '@/components/common/Head';
import Find from '@/components/common/Find';
import NotesEditForm from '@/components/common/NotesEditForm';
import { statusType,statusText } from '@/lib/filters';

const TableColumns = [
    {
        title: '笔记名称',
        dataIndex: 'name',
        width: 120,
        fixed: 'left',
        scopedSlots: { customRender: 'name' }
    },
    {
        title: '笔记作者',
        dataIndex: 'author',
        width: 90
    },
    {
        title: '笔记描述',
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
        title: '笔记状态',
        dataIndex: 'status',
        align: 'center',
        width: 75,
        scopedSlots: { customRender: 'status' }
    },
    {
        title: '笔记操作',
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
            TableBata: [],
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
                description: ''
            }
        }
    },
    created() {
        this.__getBookListFn()
    },
    filters: {
        statusType: (v) => statusType(v),
        statusText: (v) => statusText(v)
    },
    methods: {
        //查询回调
        findCollBack(e) {
            this.FindWhereBookFn(e)
        },
        //新增回调
        pluscollBack() {
            this.pushModal.visible = true
        },
        //重置回调
        replycollBack() {
            this.__getBookListFn()
        },
        //查询
        async FindWhereBookFn(findData) {
            try {
                this.loading = true
                let res = await this.Api.FindWhereBookFn({ ...findData })
                if(res.code === 200) {
                    this.TableBata = this.TableMap(res.data)
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
            this.editModal.visible = true
        },
        //编辑保存
        async editEnd({ id,name,tags,Text,theme,weights,description }) {
            try {
                this.loading = true
                this.editModal.visible = false
                let res = await this.Api.UpdateBook({
                    id,name,tags,Text,theme,weights,description
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
                let res = await this.Api.OpenBookFn({ id })
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
                let res = await this.Api.DownBookFn({ id })
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
                let res = await this.Api.DelBookFn({ id })
                if(res.code === 200) {
                    this.TableBata = this.TableMap(res.data)
                    this.$notification.success({ message: '删除成功！', duration: 1.5, description: '' })
                }
            } catch (error) {
                console.error(error)
            }
            this.loading = false
        },
        //获取所有项目列表
        async __getBookListFn() {
            try {
                this.loading = true
                let res = await this.Api.getBookListFn()
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
                description: v.description,
                status: v.status,
                createdAt: v.createdAt.slice(0,v.createdAt.indexOf('T')),
                uid: v.uid,
                weights: v.weights,
                tags: v.tags,
                Text: v.Text,
                Textvalue: v.Textvalue,
                theme: v.theme
            }))
            return v
        }
    },
    components: {
        Head,
        Find,
        NotesEditForm
    }
}
</script>

<style lang="stylus" scoped>
.root {
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



