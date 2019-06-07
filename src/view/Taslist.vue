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
                        v-model="search.author"
                        style="min-width: 174px;"
                    >
                        <a-select-option value="1">鱿鱼须</a-select-option>
                        <a-select-option value="2">斯图真美</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="状态">
                    <a-select
                        placeholder='请选择'
                        v-model="search.author"
                        style="min-width: 174px;"
                    >
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
                <a-form-item label="日期">
                    <a-range-picker @change="pickerChange" >
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
            </a-form>
            <a-table :columns="columns" :dataSource="data" bordered>
                <a slot="name" slot-scope="text" href="javascript:;">{{text}}</a>
                <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
                <span slot="tags" slot-scope="tags">
                <a-tag v-for="tag in tags" color="blue" :key="tag">{{tag}}</a-tag>
                </span>
                <span slot="action" slot-scope="text, record">
                <a href="javascript:;">Invite 一 {{record.name}}</a>
                <a-divider type="vertical" />
                <a href="javascript:;">Delete</a>
                <a-divider type="vertical" />
                <a href="javascript:;" class="ant-dropdown-link">
                    More actions <a-icon type="down" />
                </a>
                </span>
            </a-table>
        </div>

        <!-- 新增弹窗 start -->
        <tas-create-form
            :visible="pushModal.visible"
            @cancel="pushModal.visible = false"
            @create="CreateTagsCollback"
        ></tas-create-form>
    </div>
</template>

<script>
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import Head from '@/components/common/Head';
import TasCreateForm from '@/components/common/TasCreateForm';

const columns = [{
  dataIndex: 'name',
  key: 'name',
  slots: { title: 'customTitle' },
  scopedSlots: { customRender: 'name' }
}, {
  title: 'Age456',
  dataIndex: 'age',
  key: 'age',
  align: 'center'
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Tags',
  key: 'tags',
  dataIndex: 'tags',
  scopedSlots: { customRender: 'tags' },
}, {
  title: 'Action',
  key: 'action',
  scopedSlots: { customRender: 'action' },
}];

const data = [];
for(let i = 0; i < 30; i++) {
    data.push({
        key: i,
        name: `刀剑神域`,
        age: i,
        address: '刀剑神域',
        tags: ['React', 'Vue', 'Koa']
    })
}


export default {
    data () {
        return {
            form: this.$form.createForm(this),

            data,
            columns,

            //搜索配置
            search: {
                author: '',
            },

            //新增弹窗配置
            pushModal: {
                visible: false,
                name: '',
                color: null,
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
    methods: {
        //查询
        handleSubmit (e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values);
                }
            })
        },
        //新增标签确定回调
        CreateTagsCollback() {
            const form = this.$refs.collectionForm.form;
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                console.log('Received values of form: ', values);
                form.resetFields();
                this.visible = false;
            });
        },
        pickerChange(date, dateString) {
            console.log(date, dateString)
        },








    },
    components: {
        Head,
        TasCreateForm
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



