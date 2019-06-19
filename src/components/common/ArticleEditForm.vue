<!--
 * @Author: 情雨随风
 * @Date: 2019-06-12 23:45:01
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-19 23:49:37
 * @Description: 笔记编辑弹窗
 -->


<template>
    <a-modal
        style="top: 20px;"
        :visible="visible"
        title='编辑文章'
        cancelText="取消"
        okText='保存'
        :width='1200'
        @cancel="cancel"
        @ok="create"
    >
        <a-form :form="form">
            <a-form-item v-bind="formItemLayout" label='笔记名称' style="margin-bottom: 10px;">
                <a-input
                    placeholder="请输入文章名称"
                    v-decorator="['name',{
                        initialValue: name,
                        rules: [{ required: true, message: '请输入文章名称!' }],
                    }]"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="类别标签" style="margin-bottom: 10px;">
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
            <a-form-item v-bind="formItemLayout" label="权重" style="margin-bottom: 10px;">
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
            <a-form-item v-bind="formItemLayout" label="阅读数" style="margin-bottom: 10px;">
                <el-input-number
                    controls-position="right"
                    :min="1"
                    :max="99"
                    size="small"
                    :precision="0"
                    v-decorator="['read',{
                        initialValue: read
                    }]"
                ></el-input-number>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="点赞数" style="margin-bottom: 10px;">
                <el-input-number
                    controls-position="right"
                    :min="1"
                    :max="99"
                    size="small"
                    :precision="0"
                    v-decorator="['suki',{
                        initialValue: suki
                    }]"
                ></el-input-number>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label='描述' style="margin-bottom: 10px;">
                <a-textarea
                    placeholder="请输入标签描述"
                    :rows="3"
                    v-decorator="['description',{
                        initialValue: description,
                        rules: [{ required: true, message: '请输入标签描述!' }],
                    }]"
                ></a-textarea>
            </a-form-item>
        </a-form>

        <meditor
            ref="meditor"
            :showSave="false"
            :Textvalue="Textvalue"
            :height="400"
            @save="save"
        ></meditor>
    </a-modal>
</template>

<script>
import meditor from '@/components/Upload/meditor'
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
        weights: {
            type: Number,
            default: () => 1
        },
        description: {
            type: String,
            default: () => ''
        },
        tags: {
            type: Array,
            default: () => []
        },
        Text: {
            type: String,
            default: () => ''
        },
        Textvalue: {
            type: String,
            default: () => ''
        },
        theme: {
            type: String,
            default: () => 'OneDark'
        },
        read: {
            type: Number,
            default: () => 1
        },
        suki: {
            type: Number,
            default: () => 1
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
                    sm: { span: 16 }
                },
            },
            tagse: [],

            //编辑器配置
            markdown: {
                mode: 1,
                autoSave: false,
                initialValue: ``,
                Text: '',
                theme: 'OneDark'
            },

            //编辑好的数据
            model: null
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
    
                this.model = values
                this.$refs.meditor.handleSave()
                this.form.resetFields();
            });
        },
        //编辑器保存事件
        save(e) {
            let model = this.model
            this.$emit('create', {
                id: this.id,
                Text: e.html,
                theme: e.theme,
                Textvalue: e.value,
                ...model
            })
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
    },
    components: {
        meditor
    }
}
</script>

<style lang="stylus" scoped>

</style>




