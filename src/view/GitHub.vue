<!--
 * @Author: 情雨随风
 * @Date: 2019-06-15 17:53:51
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-20 21:50:54
 * @Description: 友链管理>GitHub
 -->


<template>
    <div class="root">
        <Head title="GitHub"></Head>
        <div class="Back-Content">
            <find
                @find="findCollBack"
                @plus="pluscollBack"
                @reply="replycollBack"
            ></find>
            <a-table
                :columns="TableColumns"
                :dataSource="TableData"
                bordered
                size="small"
                :loading="loading"
                :locale="{
                    emptyText: '暂无数据'
                }"
                :scroll="{ x: 1500 }"
            >
                
                <template slot="name" slot-scope="text, row">
                    <b v-html="row.name"></b>
                </template>
                <template slot="githubAvatar" slot-scope="text, row">
                    <img class="avatar" :src="row.githubAvatar" style="width:50px;height:50px;" alt="" />
                </template>
                <template slot="sex" slot-scope="text, row">
                    <a-icon 
                        :style="{
                            fontSize: '22px',
                            color: row.sex == 2 ? '#46B6EF' : '#F37E7D'
                        }"
                        type="user"
                    ></a-icon>
                </template>
                <template slot="github" slot-scope="text">
                    <a-tag color="blue" style="margin: 0 auto;">
                        <a :href="text" target="_blank">GitHub</a>
                    </a-tag>
                </template>
                <template slot="blog" slot-scope="text">
                    <a-tag color="blue" style="margin: 0 auto;">
                        <a :href="text" target="_blank" v-if="text">博客</a>
                        <span v-else>暂无</span>
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

        <!-- 新增github弹窗 -->
        <github-create-form
            :visible="pushModal.visible"
            @cancel="() => { pushModal.visible = false }"
            @create="CreateGitHubFn"
        ></github-create-form>

        <!-- 编辑github弹窗 -->
        <github-edit-form
            :visible="editModal.visible"
            :address="editModal.address"
            :blog="editModal.blog"
            :description="editModal.description"
            :github="editModal.github"
            :githubAvatar="editModal.githubAvatar"
            :githubName="editModal.githubName"
            :id="editModal.id"
            :name="editModal.name"
            :sex="editModal.sex"
            :weights="editModal.weights"
            @cancel="() => { editModal.visible = false }"
            @create="EndEdit"
        ></github-edit-form>
    </div>
</template>

<script>
import Head from '@/components/common/Head';
import Find from '@/components/common/Find';
import GithubCreateForm from '@/components/common/GithubCreateForm';
import GithubEditForm from '@/components/common/GithubEditForm';
import { statusType,statusText } from '@/lib/filters';

const TableColumns = [
    {
        title: '昵称',
        dataIndex: 'name',
        width: 100,
        fixed: 'left',
        scopedSlots: { customRender: 'name' }
    },
    {
        title: '用户头像',
        dataIndex: 'githubAvatar',
        width: 85,
        fixed: 'left',
        align: 'center',
        scopedSlots: { customRender: 'githubAvatar' }
    },
    {
        title: '性别',
        dataIndex: 'sex',
        align: 'center',
        width: 60,
        scopedSlots: { customRender: 'sex' }
    },
    {
        title: 'GitHub账户',
        dataIndex: 'githubName',
        width: 100
    },
    {
        title: '用户介绍',
        dataIndex: 'description'
    },
    {
        title: '居住城市',
        width: 110,
        dataIndex: 'address'
    },
    {
        title: 'Github地址',
        dataIndex: 'github',
        width: 90,
        align: 'center',
        scopedSlots: { customRender: 'github' }
    },
    {
        title: '博客地址',
        dataIndex: 'blog',
        width: 80,
        align: 'center',
        scopedSlots: { customRender: 'blog' }
    },
    {
        title: '用户状态',
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
    data() {
        return {
            //表格配置
            TableData: [],
            TableColumns,
            loading: false,

            //新增弹窗配置
            pushModal: {
                visible: false,
            },

            //编辑配置
            editModal: {
                visible: false,
                address: "",
                blog: "",
                description: "",
                github: "",
                githubAvatar: "",
                githubName: "",
                id: "",
                name: "",
                sex: 1,
                weights: 1
            }
        }
    },
    created() {
        this.getGitHubListFn()
    },
    filters: {
        statusType: (v) => statusType(v),
        statusText: (v) => statusText(v)
    },
    methods: {
        //查询回调
        findCollBack(e) {
            this.FindGitHubFn(e)
        },
        //新增回调
        pluscollBack() {
            this.pushModal.visible = true
        },
        //重置回调
        replycollBack() {
            this.getGitHubListFn()
        },
        //查询
        async FindGitHubFn(findData) {
            try {
                this.loading = true
                let res = await this.Api.FindGitHubFn({ ...findData })
                if(res.code === 200) {
                    this.TableData = this.TableMap(res.data)
                    this.$notification.success({ message: '查找成功！', duration: 1.5, description: '' })
                }
            } catch (error) {
                console.error(error)
            }
            this.loading = false
        },
        //新增保存
        async CreateGitHubFn({ address,blog,description,github,githubName,name,sex,weights,githubAvatar }) {
            try {
                this.loading = true
                this.pushModal.visible = false
                let res = await this.Api.postGitHubFn({
                    address,description,github,
                    githubName,name,sex,weights,githubAvatar,
                    blog: blog || ""
                })

                if(res.code === 200) {
                    this.TableData = this.TableMap(res.data)
                    this.$notification.success({ message: '新增成功！', duration: 1.5, description: '' })
                }
            } catch (error) {
                console.error(error)
            }
            this.loading = false
        },
        //编辑
        startEdit(row) {
            this.editModal.address = row.address
            this.editModal.blog = row.blog || ""
            this.editModal.description = row.description
            this.editModal.github = row.github
            this.editModal.githubAvatar = row.githubAvatar
            this.editModal.githubName = row.githubName
            this.editModal.id = row.id
            this.editModal.name = row.name
            this.editModal.sex = row.sex
            this.editModal.weights = row.weights
            this.editModal.visible = true
        },
        //跟新保存
        async EndEdit({ id,githubName,github,sex,name,address,description,githubAvatar,weights,blog }) {
            try {
                this.loading = true
                this.editModal.visible = false
                let res = await this.Api.UpdateGitHubFn({
                    id,githubName,github,sex,name,address,
                    description,githubAvatar,weights,blog
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
                let res = await this.Api.OpenGitHubFn({ id })
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
                let res = await this.Api.DownGitHubFn({ id })
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
                let res = await this.Api.DelGitHubFn({ id })
                if(res.code === 200) {
                    this.TableBata = this.TableMap(res.data)
                    this.$notification.success({ message: '删除成功！', duration: 1.5, description: '' })
                }
            } catch (error) {
                console.error(error)
            }
            this.loading = false
        },
        //获取友链列表
        async getGitHubListFn() {
            try {
                this.loading = true
                let res = await this.Api.getGitHubListFn()

                if(res.code === 200) {
                    this.TableData = this.TableMap(res.data)
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
                githubName: v.githubName,
                githubAvatar: v.githubAvatar,
                description: v.description,
                github: v.github,
                address: v.address,
                blog: v.blog,
                status: v.status,
                weights: v.weights,
                sex: v.sex
            }))
            return v
        }
    },
    components: {
        Head,
        Find,
        GithubEditForm,
        GithubCreateForm
    }
}
</script>

<style lang="stylus" scoped>
.root {
    margin 0 -24px
    min-width 1212px
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
