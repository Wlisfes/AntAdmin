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
            <a-form layout="inline" style="margin-bottom: 24px;">
                <a-form-item label="注册时间">
                    <a-range-picker
                        :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }"
                        :format="dateFormat"
                    />
                </a-form-item>
                <a-form-item label="状态">
                    <a-select placeholder='请选择' v-model="search.status"  style="min-width: 174px;">
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
                <a-button type="primary" style="margin: 3.5px 6px 0" html-type="submit" icon='scan' @click="handleSearch">
                    查询
                </a-button>
                <a-button icon='sync' style="margin: 3.5px 6px 0" @click="handleReset">
                    重置
                </a-button>
            </a-form>

            <div class="back-Table">
                <a-table 
                    :columns="columns" 
                    :dataSource="Table" 
                    bordered 
                    size="middle"
                    :locale="{
                        emptyText: '暂无数据'
                    }"
                >
                    <span slot="name" slot-scope="name">
                        <b :key="name">{{ name }}</b>
                    </span>
                    <span slot="status" slot-scope="status">
                        <a-tag :color="status == 1 ? '#04be02' : '#1890ff'" :key="status">
                            {{ status | tags }}
                        </a-tag>
                    </span>
                    <template slot="modify" slot-scope="text, record">
                        <span>
                            <a-button style="margin-right: 8px;" @click="() => edit(record.key)">修改密码</a-button>
                            <a-button style="margin-right: 8px;" @click="() => edit(record.key)">修改</a-button>
                        </span>
                    </template>
                </a-table>
            </div>
        </div>
    </div>
</template>

<script>
import Head from '../components/common/Head'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const columns = [
    {
        title: '用户名',
        dataIndex: 'name',
        width: '10%',
        align: 'center',
        scopedSlots: { customRender: 'name' }
    }, 
    {
        title: '注册时间',
        dataIndex: 'date',
        align: 'center',
        width: '10%'
    },
    {
        title: '管理员类型',
        dataIndex: 'Admin',
        width: '8%',
        align: 'center',
        scopedSlots: { customRender: 'Admin' }
    },
    {
        title: '状态',
        dataIndex: 'status',
        width: '8%',
        align: 'center',
        scopedSlots: { customRender: 'status' }
    },
    {
        title: '说明',
        dataIndex: 'descr',
        scopedSlots: { customRender: 'descr' }
    },
    {
        title: '操作',
        dataIndex: 'modify',
        width: '20%',
        scopedSlots: { customRender: 'modify' }
    }
]

const data = [
    {
        key: '1',
        name: 'Vue',
        user: 'Admin',
        status: 1,
        date: '2018-4-16',
        descr: '尤雨溪开发的专注于构建用户界面的渐进式框架。'
    }, 
    {
        key: '2',
        name: 'React',
        user: 'Admin',
        status: 2,
        date: '2018-5-3',
        descr: '用于构建用户界面的 JS 库'
    },
    {
        key: '3',
        name: 'Nodejs',
        user: 'Admin',
        status: 1,
        date: '2018-9-3',
        descr: '一个基于 Chrome V8 引擎 的 JavaScript 运行时。'
    },
    {
        key: '4',
        name: 'HTML',
        user: 'Admin',
        status: 1,
        date: '2018-2-3',
        descr: '超文本标记语言，是一种用于创建网页的标准标记语言。'
    },
    {
        key: '5',
        name: 'JavaScript',
        user: 'Admin',
        status: 1,
        date: '2018-2-3',
        descr: 'JavaScript，通常缩写为JS，是一种高级的，直译语言的编程语言。'
    },
    {
        key: '6',
        name: 'TypeScript',
        user: 'Admin',
        status: 1,
        date: '2017-9-22',
        descr: 'TypeScript是JavaScript的一个超集，友微软开发即开源的编程语言。'
    },
    {
        key: '7',
        name: 'QuickApp',
        user: 'Admin',
        status: 1,
        date: '2017-9-22',
        descr: 'QuickApp是由国内十大手机厂商联合开发的移动互联网新型应用生态。'
    }
]

export default {
    data () {
        this.cacheData = data.map(item => ({ ...item }))
        return {
            Table: [],
            columns,
            Tableload: false,

            dateFormat: 'YYYY/MM/DD',
            monthFormat: 'YYYY/MM',

            //搜索配置
            search: {
                user: '',
                status: ''
            }
        }
    },
    filters: {
        tags(key) {
            return key == 1 ? '已开放' : '已关闭'
        }
    },
    created () {
        this.__AdminAllUser()
    },
    methods: {
        moment,
        //搜索
        handleSearch() {
            let { status, user } = this.search
            const hide = this.$message.loading('查询中  ···', 0)
            setTimeout(hide, 5000)
        },
        //重置
        handleReset() {
            this.search.status = ''
            this.search.user = ''
        },
        //编辑
        edit (key) {
            
        },
        //获取所有用户
        async __AdminAllUser() {
            try {
                let res = await this.Api.AdminAllUser()
                
                if(res.code === 200) {
                    let Table = res.data.map((el, k) => {
                            el['key'] = k
                        return el
                    })
                    this.Table = Table
                } else {
                    this.$message.error(res.message)
                }
            } catch (error) {
                this.$message.error(error)
                return
            }
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
        margin 24px 24px 0
        flex 1
        display flex
        flex-direction column
        background #ffffff
        padding 24px 24px

        
    }
}
</style>


