<!--
 * @Author: 情雨随风
 * @Date: 2019-06-16 17:58:48
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-16 23:52:52
 * @Description: 
 -->


<template>
    <a-modal
        :visible="visible"
        title='新增Git友'
        cancelText="取消"
        okText='保存'
        :width='900'
        @cancel="cancel"
        @ok="create"
    >
        <a-form :form="form">
            <a-form-item v-bind="formItemLayout" label='GitHub名称'>
                <a-input
                    placeholder="请输入GitHub名称"
                    v-decorator="['githubName',{
                        rules: [{ required: true, message: '请输入GitHub名称!' }],
                    }]"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label='GitHub地址'>
                <a-input
                    placeholder="请输入GitHub地址"
                    v-decorator="['github',{
                        rules: [{ required: true, message: '请输入GitHub地址!' }],
                    }]"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label='Blog地址'>
                <a-input
                    placeholder="请输入Blog地址"
                    v-decorator="['blog']"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label='友链头像'>
                <a-input
                    placeholder="请输入友链头像"
                    v-decorator="['githubAvatar', {
                        rules: [{ required: true, message: '请输入友链头像!' }],
                    }]"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="User性别">
                <a-radio-group
                    v-decorator="['sex',{
                            initialValue: 2
                        }]">
                        <a-radio :value="2" checked>男</a-radio>
                        <a-radio :value="1">女</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label='User昵称'>
                <a-input
                    placeholder="请输入User昵称"
                    v-decorator="['name',{
                        rules: [{ required: true, message: '请输入User昵称!' }],
                    }]"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label='User地址'>
                <a-input
                    placeholder="请输入User地址"
                    v-decorator="['address']"
                />
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
            <a-form-item v-bind="formItemLayout" label='User介绍'>
                <a-textarea
                    placeholder="请输入User介绍"
                    :rows="3"
                    v-decorator="['description',{
                        rules: [{ required: true, message: '请输入User介绍!' }],
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
            default: () => false
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
            }
        }
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
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
