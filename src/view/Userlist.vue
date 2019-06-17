/*
 * @Author: Parker 
 * @Date: 2019-05-05 16:11:53 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-17 16:57:41
 * @Types 用户管理>用户列表界面
 */

<template>
    <div id="Tas">
        <Head title="用户列表"></Head>
        <div class="Back-Content">
            <div class="back-Table">
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
                    <template slot="avatar" slot-scope="text, row">
                        <img class="avatar" :src="row.avatar" alt="" />
                        <!-- <img class="avatar" :src="'http://localhost:9800' + row.avatar" alt="" /> -->
                    </template>
                    <template slot="admin" slot-scope="text, row">
                        <span>{{ row.admin | adminText }}</span>
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
                    <!-- <template slot="description" slot-scope="text">
                        <div style="height: 40px;overflow-y: auto;">
                            {{text}}
                        </div>
                    </template> -->
                    <template slot="status" slot-scope="text">
                        <a-badge
                            :status="text | statusType"
                            :text="text | statusText"
                        ></a-badge>
                    </template>
                    <template slot="operation" slot-scope="text, row">
                        <el-button
                            @click="editStart(row)"
                            size="mini"
                            type="primary"
                        >编辑</el-button>
                        <el-button
                            @click="open(row.uid)"
                            size="mini"
                            type="success"
                        >发布</el-button>
                        <el-button
                            @click="down(row.uid)"
                            type="warning"
                            size="mini"
                        >关闭</el-button>
                    </template>
                </a-table>
            </div>
        </div>

        <!-- 用户资料编辑弹窗 -->
        <user-edit-form
            :visible="editModal.visible"
            :uid="editModal.uid"
            :phone="editModal.phone"
            :password="editModal.password"
            :admin="editModal.admin"
            :nickname="editModal.nickname"
            :sex="editModal.sex"
            :age="editModal.age"
            :avatar="editModal.avatar"
            :description="editModal.description"
            @cancel="() => { editModal.visible = false }"
            @create="editEnd"
        ></user-edit-form>
    </div>
</template>

<script>
import Head from '@/components/common/Head';
import UserEditForm from '@/components/common/UserEditForm';
import { statusType,statusText,adminText } from '@/lib/filters';

const TableColumns = [
    {
        title: '用户昵称',
        dataIndex: 'nickname',
        width: 120,
        fixed: 'left',
        scopedSlots: { customRender: 'nickname' }
    },
    {
        title: '用户头像',
        dataIndex: 'avatar',
        width: 85,
        fixed: 'left',
        align: 'center',
        scopedSlots: { customRender: 'avatar' }
    },
    {
        title: '账号类型',
        dataIndex: 'admin',
        align: 'center',
        width: 110,
        scopedSlots: { customRender: 'admin' }
    },
    {
        title: '用户账号',
        dataIndex: 'phone',
        align: 'center',
        width: 105,
    },
    {
        title: '用户性别',
        dataIndex: 'sex',
        align: 'center',
        width: 85,
        scopedSlots: { customRender: 'sex' }
    },
    {
        title: '用户年龄',
        align: 'center',
        width: 85,
        dataIndex: 'age'
    },
    {
        title: '用户说明',
        dataIndex: 'description',
        scopedSlots: { customRender: 'description' }
    },
    {
        title: '注册时间',
        dataIndex: 'createdAt',
        width: 100,
        align: 'center',
        scopedSlots: { customRender: 'createdAt' }
    },
    {
        title: '项目状态',
        dataIndex: 'status',
        align: 'center',
        width: 85,
        scopedSlots: { customRender: 'status' }
    },
    {
        title: '用户操作',
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
            //表格配置
            loading: false,
            TableColumns,
            TableData: [],

            //编辑弹窗配置
            editModal: {
                visible: false,
                uid: '',
                phone: null,
                password: '',
                admin: '',
                nickname: '',
                sex: 1,
                age: 18,
                avatar: '',
                description: ''
            }
            
        }
    },
    filters: {
        statusType: (v) => statusType(v),
        statusText: (v) => statusText(v),
        adminText: (v) => adminText(v)
    },
    created () {
        this.getUserListFn()
    },
    methods: {
        //编辑
        editStart (row) {
            this.editModal.uid = row.uid
            this.editModal.phone = row.phone
            this.editModal.admin = row.admin
            this.editModal.nickname = row.nickname
            this.editModal.sex = row.sex
            this.editModal.age = row.age
            this.editModal.avatar = row.avatar
            this.editModal.description = row.description
            this.editModal.visible = true
        },
        //编辑保存
        async editEnd({ phone,password,nickname,sex,age,description,uid,admin }) {
            try {
                this.loading = true
                this.editModal.visible = false
                let res = await this.Api.UpdateUser({
                    phone,password,nickname,sex,age,description,uid,admin
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
        async open(uid) {
            try {
                this.loading = true
                let res = await this.Api.OpenUserFn({ uid })
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
        async down(uid) {
            try {
                this.loading = true
                let res = await this.Api.OpenDownFn({ uid })
                if(res.code === 200) {
                    this.TableData = this.TableMap(res.data)
                    this.$notification.success({ message: '关闭成功！', duration: 1.5, description: '' })
                }
            } catch (error) {
                console.error(error)
            }
            this.loading = false
        },
        //获取所有用户
        async getUserListFn() {
            try {
                this.loading = true
                let res = await this.Api.getUserListFn()
                
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
            let v = arr.map(k => ({
                key: k.uid,
                admin: k.admin,
                age: k.age,
                avatar: k.avatar,
                createdAt: k.createdAt.slice(0,k.createdAt.indexOf('T')),
                description: k.description,
                nickname: k.nickname,
                phone: k.phone,
                sex: k.sex,
                status: k.status,
                uid: k.uid
            }))
            return v
        }
    },
    components: {
        Head,
        UserEditForm
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

        .avatar {
            width 50px
            height 50px
        }
    }
}
</style>


