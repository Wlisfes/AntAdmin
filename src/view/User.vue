/*
 * @Author: 情雨随风 
 * @Date: 2019-05-12 12:24:01 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-14 14:45:11
 * @Types 用户注册界面
 */


<template>
    <div class="root">
        <Head title="用户注册"></Head>
        <div class="Back-Content">
            
            <a-form :form="form" @submit="handleSubmit">
                <a-form-item label="用户名" v-bind="itemClo">
                    <a-input placeholder="请输入用户名" v-decorator="formRules.name" />
                </a-form-item>
                <a-form-item label="密码" v-bind="itemClo">
                    <a-input placeholder="请输入密码" type="password" v-decorator="formRules.password" />
                </a-form-item>
                <a-form-item label="账户类型" v-bind="itemClo">
                    <a-radio-group v-decorator="['Admin', { initialValue: 'visitor' }]">
                        <a-radio value="visitor" checked>visitor</a-radio>
                        <a-radio value="Admin">Admin</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="昵称" v-bind="itemClo">
                    <a-input placeholder="请输入昵称" v-decorator="formRules.nickName" />
                </a-form-item>
                <a-form-item label="性别" v-bind="itemClo">
                    <a-radio-group v-decorator="['sex', { initialValue: 1 }]">
                        <a-radio :value="1" checked>男</a-radio>
                        <a-radio :value="0">女</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="年龄" v-bind="itemClo">
                    <a-input-number v-decorator="['age', { initialValue: 18 }]" />
                </a-form-item>
                <a-form-item label="说明" v-bind="itemClo">
                    <a-textarea v-decorator="formRules.descr" :autosize="{ minRows: 4, maxRows: 4 }" />
                </a-form-item>
                <a-form-item label="头像" v-bind="itemClo">
                    <a-upload
                        v-decorator="['upload']"
                        action="http://localhost:9999/Admin/upload"
                        listType="picture-card"
                        :fileList="fileList"
                        @preview="handlePreview"
                        @change="handleChange"
                    >
                        <div v-if="fileList.length < 1">
                            <a-icon type="plus" />
                            <div class="ant-upload-text">Upload</div>
                        </div>
                    </a-upload>
                </a-form-item>




                <a-form-item :wrapper-col="{ span: 12, offset: 4 }">
                    <a-button type="primary" html-type="submit">注册</a-button>
                    <a-button style="margin-left: 10px;">重置</a-button>
                </a-form-item>
            </a-form>
        </div>
    </div>
</template>

<script>
import Head from '../components/common/Head'
export default {
    data () {
        return {
            formLayout: 'horizontal',
            form: this.$form.createForm(this),

            itemClo: {
                labelCol: {
                    span: 4
                },
                wrapperCol: {
                    span: 12
                }
            },
            formRules: {
                name: [
                    'name',
                    {
                        rules: [
                            { required: true, message: '用户名不能为空！' },
                            { min: 4, max: 20, message: '用户名长度必须是4~20位之间！' },
                            { pattern: /^[0-9a-zA-Z]+$/, message: '必须是数字跟字母！' }
                        ]
                    }
                ],
                password: [
                    'password',
                    {
                        rules: [
                            { required: true, message: '密码不能为空！' },
                            { min: 6, max: 20, message: '密码长度必须是4~20位之间！' }
                        ]
                    }
                ],
                nickName: [
                    'nickName',
                    {
                        rules: [
                            { required: true, message: '昵称不能为空！' }
                        ]
                    }
                ],
                descr: [
                    'descr',
                    {
                        rules: [
                            { required: true, message: '用户描述必填！' }
                        ]
                    }
                ]
            },
            previewVisible: false,
            previewImage: '',
            fileList: []
        }
    },
    methods: {
        handleSubmit (e) {
            e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.__AdminEnrolment(values)
                        console.log(values)
                    }
                });
        },
        async __AdminEnrolment(formValue) {
            let { Admin,age,descr,name,nickName,password,sex,upload } = formValue
            try {
                let res = await this.Api.AdminEnrolment({
                    Admin,
                    age,
                    descr,
                    name,
                    nickName,
                    password,
                    sex,
                    Avatar: upload && upload.file.response.url ? upload.file.response.url : ''
                })
                
                console.log(res)
            } catch (error) {
                
            }
        },
        handleCancel () {
            this.previewVisible = false
        },
        handlePreview (file) {
            this.previewImage = file.url || file.thumbUrl
            this.previewVisible = true
        },
        handleChange ({ fileList }) {
            this.fileList = fileList
        }
    },
    components: {
        Head
    }
}
</script>

<style lang="stylus" scoped>
.root {
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

        .ant-upload-select-picture-card i {
            font-size: 32px;
            color: #999;
        }

        .ant-upload-select-picture-card .ant-upload-text {
            margin-top: 8px;
            color: #666;
        }
    }
}
</style>