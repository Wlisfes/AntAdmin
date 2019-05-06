/*
 * @Author: Parker 
 * @Date: 2019-05-05 16:19:40 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-07 00:10:04
 * @Types 标签管理>标签列表界面
 */

<template>
    <div id="Tas">
        <Head title="标签列表"></Head>
        <div class="Back-Content">
            <div class="back-Table">

                <a-table 
                    :columns="columns" 
                    :dataSource="data" 
                    bordered
                    :loading="Tableload"
                >
                    <span slot="name" slot-scope="name">
                        <a-tag color="blue" :key="name">{{ name }}</a-tag>
                    </span>

                    <span slot="status" slot-scope="status">
                        <a-tag :color="status == 1 ? '#04be02' : '#1890ff'" :key="status">
                            {{ status | tags }}
                        </a-tag>
                    </span>
                  
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
        title: '状态',
        key: 'status',
        dataIndex: 'status',
        scopedSlots: { customRender: 'status' }
    },
    {
        title: '创建时间',
        key: 'date',
        dataIndex: 'date'
    },
    {
        title: '描述',
        key: 'descr',
        dataIndex: 'descr'
    }
]

const data = [
    {
        key: '1',
        name: 'Vue',
        status: 1,
        date: '2018-4-16',
        descr: '尤雨溪开发的专注于构建用户界面的渐进式框架。'
    }, 
    {
        key: '2',
        name: 'React',
        status: 2,
        date: '2018-5-3',
        descr: '用于构建用户界面的 JS 库'
    }
    
]
export default {
    data () {
        return {
            data,
            columns,
            Tableload: false
        }
    },
    filters: {
        tags(key) {
            return key == 1 ? '已发布' : '已关闭'
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



