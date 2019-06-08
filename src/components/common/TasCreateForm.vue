<!--
 * @Author: 情雨随风
 * @Date: 2019-06-07 07:29:02
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-08 20:16:05
 * @Description: 标签新增弹窗
 -->


<template>
    <a-modal
        :visible="visible"
        title='新增标签'
        cancelText="取消"
        okText='保存'
        @cancel="cancel"
        @ok="create"
    >
        <a-form :form="form">
            <a-form-item v-bind="formItemLayout" label='标签'>
            <a-input
                placeholder="请输入标签名称"
                v-decorator="['name',{
                        rules: [{ required: true, message: '请输入标签名称!' }],
                }]"
            />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="颜色">
                <el-color-picker
                    style="width: 100%;"
                    :predefine="predefineColors"
                    v-decorator="['color',{
                        rules: [{ required: true, message: '请选择颜色!' }],
                    }]"
                ></el-color-picker>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label='描述'>
                <a-textarea
                    placeholder="请输入标签描述"
                    :rows="8"
                    v-decorator="['description',{
                        rules: [{ required: true, message: '请输入标签描述!' }],
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
            },
            predefineColors: ['#ff4500','#ff8c00','#ffd700','#90ee90','#00ced1','#1e90ff','#c71585']
        }
    },
    methods: {
        cancel() {
            const form = this.form
            this.$emit('cancel')
            form.resetFields()
        },
        create() {
            const form = this.form;
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }
                this.$emit('create', { ...values })
                form.resetFields();
            });
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>

