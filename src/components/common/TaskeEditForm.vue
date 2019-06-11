<!--
 * @Date: 2019-06-11 10:12:30
 * @Author: 情雨随风
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-11 21:34:47
 * @Description: 项目编辑弹窗
 -->



<template>
    <a-modal
        :visible="visible"
        title='编辑项目'
        cancelText="取消"
        okText='保存'
        :width='750'
        @cancel="cancel"
        @ok="create"
    >
        <a-form :form="form">
            <a-form-item v-bind="formItemLayout" label='项目名称'>
                <a-input
                    placeholder="请输入项目名称"
                    v-decorator="['name',{
                        initialValue: name,
                        rules: [{ required: true, message: '请输入标签名称!' }],
                    }]"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="类别标签">
                <a-select
                    style="max-width: 100%; width: 100%;"
                    mode="multiple"
                    placeholder="请选择类别标签"
                    v-decorator="['tags',{
                        initialValue: tags,
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
            <a-form-item v-bind="formItemLayout" label="源码地址">
                <a-input
                    placeholder="请输入github地址"
                    v-decorator="['github',{
                        initialValue: github,
                        rules: [{ required: true, message: '请输入github地址!' }],
                    }]"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="预览地址">
                <a-input
                    placeholder="请输入项目线上预览地址"
                    v-decorator="['viewUrl',{
                        initialValue: viewUrl,
                        rules: [{ required: true, message: '请输入项目线上预览地址!' }],
                    }]"
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
        tags: {
            type: Array,
            default: () => []
        },
        github: {
            type: String,
            default: () => 'https://github.com/Wlisfes'
        },
        viewUrl: {
            type: String,
            default: () => 'https://github.com/Wlisfes'
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
            tagse: [],
            number: {
                value: 1
            }
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
                this.$emit('create', { ...values, id: this.id })
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