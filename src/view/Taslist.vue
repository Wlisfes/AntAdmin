/*
 * @Author: Parker 
 * @Date: 2019-05-05 16:19:40 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-07 23:17:35
 * @Types 标签管理>标签列表界面
 */

<template>
    <div id="Tas">
        <Head title="标签列表"></Head>
        <div class="Back-Content">
            <a-form layout="inline" style="margin-bottom: 24px;">
                <a-form-item label="作者">
                    <a-select placeholder='请选择' v-model="search.user" style="min-width: 174px;">
                        <a-select-option value="lisfes">lisfes</a-select-option>
                        <a-select-option value="CNinc">CNinc</a-select-option>
                        <a-select-option value="茂茂">茂茂</a-select-option>
                        <a-select-option value="nodemirai">nodemirai</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="状态">
                    <a-select placeholder='请选择' v-model="search.status"  style="min-width: 174px;">
                        <a-select-option value="1">
                                <a-icon type="check-circle" style="color: #04be02" />
                                已发布
                            </a-select-option>
                            <a-select-option value="2">
                                <a-icon type="exclamation-circle" style="color: #1890ff" />
                                已关闭
                        </a-select-option>
                    </a-select>
                </a-form-item>
                <a-button type="primary" style="margin: 3.5px 6px 0" icon='plus-circle'>
                    新增
                </a-button>
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
                    :dataSource="data" 
                    bordered
                    size="middle"
                    :loading="Tableload"
                    :defaultExpandAllRows="false"
                >
                    <span slot="name" slot-scope="name">
                        <a-tag color="blue" :key="name">{{ name }}</a-tag>
                    </span>
                    <span slot="status" slot-scope="status">
                        <a-tag :color="status == 1 ? '#04be02' : '#1890ff'" :key="status">
                            {{ status | tags }}
                        </a-tag>
                    </span>
                    <template slot="modify" slot-scope="modify, coll">
                        <a-tooltip placement="top" >
                            <template slot="title">
                                <span>编辑</span>
                            </template>
                            <a-button type="primary" icon='edit' style="margin: 0 6px;" @click="edit(coll)"></a-button>
                        </a-tooltip>
                        <a-dropdown>
                            <a-menu slot="overlay">
                                <a-menu-item key="1" @click="setting({ key: 1, coll })">
                                    <a-icon type="check-circle" style="color: #04be02" />
                                    发布
                                </a-menu-item>
                                <a-menu-item key="2" @click="setting({ key: 2, coll })">
                                    <a-icon type="exclamation-circle" style="color: #1890ff" />
                                    关闭
                                </a-menu-item>
                                <a-menu-item key="3" @click="setting({ key: 3, coll })">
                                    <a-icon type="close-circle" style="color: #f5222d" />
                                    删除
                                </a-menu-item>
                            </a-menu>
                            <a-button type="primary" icon='setting' style="margin: 0 6px;"></a-button>
                        </a-dropdown>
                    </template>
                </a-table>
            </div>
        </div>
    </div>
</template>

<script>
import Head from '../components/common/Head'

const columns = [
    {
        title: '类型',
        dataIndex: 'name',
        key: 'name',
        scopedSlots: { customRender: 'name' }
    },
    {
        title: '创建时间',
        key: 'date',
        dataIndex: 'date'
    },
    {
        title: '作者',
        key: 'user',
        dataIndex: 'user'
    },
    {
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        scopedSlots: { customRender: 'status' }
    },
    {
        title: '描述',
        key: 'descr',
        dataIndex: 'descr'
    },
    {
        title: '操作',
        key: 'modify',
        dataIndex: 'modify',
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
        return {
            data,
            columns,
            Tableload: false,

            //搜索配置
            search: {
                user: '',
                status: ''
            }
        }
    },
    filters: {
        tags(key) {
            return key == 1 ? '已发布' : '已关闭'
        }
    },
    methods: {
        //设置
        setting(e) {
            console.log(e)
        },
        //编辑
        edit(e) {
            console.log(e)
        },
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



