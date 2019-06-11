<!--
 * @Author: 情雨随风
 * @Date: 2019-06-09 13:34:25
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-11 13:51:02
 * @Description: 标签编辑弹窗
 -->


<template>
    <a-modal
        :visible="visible"
        title='编辑标签'
        cancelText="取消"
        okText='保存'
        :width='640'
        @cancel="cancel"
        @ok="create"
    >
        <a-form :form="form">
            <a-form-item v-bind="formItemLayout" label='标签'>
            <a-input
                placeholder="请输入标签名称"
                v-decorator="['name',{
                    initialValue: name,
                    rules: [{ required: true, message: '请输入标签名称!' }],
                }]"
            />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="颜色">
                <el-color-picker
                    style="width: 100%;"
                    :predefine="predefineColors"
                    v-decorator="['color',{
                        initialValue: color,
                        rules: [{ required: true, message: '请选择颜色!' }],
                    }]"
                ></el-color-picker>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="权重">
                <el-input-number
                    controls-position="right"
                    :min="1"
                    :max="99"
                    size="small"
                    :precision="0"
                    v-decorator="['weights',{
                        initialValue: weights
                    }]"
                ></el-input-number>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label='描述'>
                <a-textarea
                    placeholder="请输入标签描述"
                    :rows="8"
                    v-decorator="['description',{
                        initialValue: description,
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
        },
        id: {
            type: String,
            default: () => ''
        },
        name: {
            type: String,
            default: () => ''
        },
        color: {
            type: String,
            default: () => ''
        },
        weights: {
            type: Number,
            default: () => 1
        },
        description: {
            type: String,
            default: () => ''
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
            predefineColors: ['#ff4500','#ff8c00','#ffd700','#90ee90','#00ced1','#1e90ff','#c71585'],
            number: {
                value: 1
            }
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
                this.$emit('create', { ...values, id: this.id })
                form.resetFields();
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