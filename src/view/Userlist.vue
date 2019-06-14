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
                    size="middle"
                    :loading="loading"
                    :locale="{
                        emptyText: '暂无数据'
                    }"
                    :scroll="{ x: 1500 }"
                >   
                    <template slot="avatar" slot-scope="text, row">
                        <img class="avatar" :src="row.avatar" alt="" />
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

                    <template slot="status" slot-scope="text">
                        <a-badge
                            :status="text | statusType"
                            :text="text | statusText"
                        ></a-badge>
                    </template>
                    <template slot="operation" >
                        <el-button size="mini" type="primary" >编辑</el-button>
                        <el-button
                            size="mini"
                            type="success"
                        >发布</el-button>
                        <el-button
                            type="warning"
                            size="mini"
                        >关闭</el-button>
                        <el-button
                            size="mini"
                            type="danger"
                        >删除</el-button>
                    </template>
                </a-table>
            </div>
        </div>
    </div>
</template>

<script>
import Head from '../components/common/Head'
import { statusType,statusText,adminText } from '@/lib/filters';

const TableColumns = [
    {
        title: '用户名称',
        dataIndex: 'nickname',
        width: 120,
        fixed: 'left',
        scopedSlots: { customRender: 'nickname' }
    },
    {
        title: '用户名称',
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
        dataIndex: 'description'
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
        edit (key) {
            
        },
        //获取所有用户
        async getUserListFn() {
            try {
                let res = await this.Api.getUserListFn()
                
                console.log(res)
                if(res.code === 200) {
                    this.TableData = this.TableMap(res.data)
                }
            } catch (error) {
                console.error(error)
            }
        },
        //表格数据格式化
        TableMap(arr) {
            if(!Array.isArray(arr)) return [];
            let v = arr.map(k => ({
                key: k.uid,
                admin: k.admin,
                age: k.age,
                avatar: `http://localhost:9800${k.avatar}`,
                createdAt: k.createdAt.slice(0,k.createdAt.indexOf('T')),
                description: k.description,
                nickname: k.nickname,
                password: k.password,
                phone: k.phone,
                sex: k.sex,
                status: k.status,
                uid: k.uid
            }))
            return v
        }
    },
    components: {
        Head
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


