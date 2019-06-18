<!--
 * @Author: 情雨随风
 * @Date: 2019-06-18 22:34:15
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-19 00:04:39
 * @Description: 文章新增弹窗
 -->


<template>
    <a-modal
        :visible="visible"
        title='新增文章'
        cancelText="取消"
        okText='保存'
        :width='750'
        @cancel="cancel"
        @ok="create"
    >
        <a-form :form="form">
            <a-form-item v-bind="formItemLayout" label='文章名称'>
                <a-input
                    placeholder="请输入文章名称"
                    v-decorator="['title',{
                        rules: [{ required: true, message: '请输入文章名称!' }],
                    }]"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="类别标签">
                <a-select
                    style="max-width: 100%; width: 100%;"
                    mode="multiple"
                    placeholder="请选择类别标签"
                    v-decorator="['tags',{
                        rules: [{ required: true, message: '请选择类别标签!' }],
                    }]"
                >
                    <a-select-option
                        v-for="ks in tagse"
                        :key="ks.id"
                        :title="ks.name"
                    >{{ ks.name }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="权重">
                <el-input-number
                    controls-position="right"
                    :min="1"
                    :max="99"
                    size="small"
                    :precision="0"
                    v-decorator="['weights',{
                        initialValue: 1
                    }]"
                ></el-input-number>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="阅读数">
                <el-input-number
                    controls-position="right"
                    :min="1"
                    :max="99"
                    size="small"
                    :precision="0"
                    v-decorator="['read',{
                        initialValue: 1
                    }]"
                ></el-input-number>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="点赞数">
                <el-input-number
                    controls-position="right"
                    :min="1"
                    :max="99"
                    size="small"
                    :precision="0"
                    v-decorator="['suki',{
                        initialValue: 1
                    }]"
                ></el-input-number>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label='描述'>
                <a-textarea
                    placeholder="请输入文章描述"
                    :rows="4"
                    v-decorator="['description',{
                        rules: [{ required: true, message: '请输入文章描述!' }],
                    }]"
                ></a-textarea>
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: () => true
        }
    },
    data() {
        return {
            form: this.$form.createForm(this),
            formItemLayout: {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 3 }
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 21 }
                },
            },
            tagse: []
        }
    },
    created() {
        this.getTagsOpenListFn()
    },
    methods: {
        //取消
        cancel() {
            this.$emit('cancel')
            this.form.resetFields()
        },
        //保存
        create() {
            this.form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                values.tags = this.tagse.filter(el => values.tags.some(ke => ke == el.id)).map(h => ({
                    id: h.id,
                    color: h.color,
                    name: h.name
                }))
  
                this.$emit('create', { ...values })
                this.form.resetFields();
            });
        },
        isNumberValue(number) {
            return {
                validateStatus: 'error',
                errorMsg: '权重最小为1，最大为99！',
            }
        },
        handleNumberChange (value) {
            this.number = {
                ...this.isNumberValue(value),
                value,
            }
        },
        //标签列表
        async getTagsOpenListFn() {
            try {
                let res = await this.Api.getTagsOpenListFn()

                if(res.code === 200) {
                    this.tagse = res.data
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
