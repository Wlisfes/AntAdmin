/*
 * @Author: 情雨随风 
 * @Date: 2019-05-12 12:24:01 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-17 16:33:28
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
                    <a-radio-group v-decorator="['admin', { initialValue: 'same' }]">
                        <a-radio value="same" checked>same</a-radio>
                        <a-radio value="admin">admin</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="昵称" v-bind="itemClo">
                    <a-input placeholder="请输入昵称" v-decorator="formRules.nickName" />
                </a-form-item>
                <a-form-item label="性别" v-bind="itemClo">
                    <a-radio-group v-decorator="['sex', { initialValue: 1 }]">
                        <a-radio :value="2" checked>男</a-radio>
                        <a-radio :value="1">女</a-radio>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="年龄" v-bind="itemClo">
                    <a-input-number v-decorator="['age', { initialValue: 18 }]" />
                </a-form-item>
                <a-form-item label="说明" v-bind="itemClo">
                    <a-textarea v-decorator="formRules.descr" :autosize="{ minRows: 4, maxRows: 4 }" />
                </a-form-item>
                <a-form-item label="头像" v-bind="itemClo">
                    <div class="Update" @click="imagecropperShow = true">
                        <img :src="'http://localhost:9800'+pictureUrl" v-if="pictureUrl" alt="" />
                        <a-icon
                            v-else
                            style="font-size: 32px;color: #999;"
                            type="plus"
                        />
                    </div>
                </a-form-item>

                <a-form-item :wrapper-col="{ span: 12, offset: 4 }">
                    <a-button type="primary" html-type="submit">注册</a-button>
                    <a-button style="margin-left: 10px;">重置</a-button>
                </a-form-item>
            </a-form>
        </div>

        <cropper
            v-show="imagecropperShow"
            :key="imagecropperKey"
            :width="300"
            :height="300"
            lang-type="zh"
            @close="close"
            @crop-upload-success="cropSuccess"
        ></cropper>
    </div>
</template>

<script>
import Head from '../components/common/Head'
import upload from '@/Api/upload'
import cropper from '../components/Upload/index'
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
                    'phone',{rules: [
                            { required: true, message: '用户名不能为空！' },
                            { pattern: /^1([38][0-9]|4[012345789]|5[0-3,4-9]|6[6]|7[01345678]|9[89])\d{8}$/, message: '必须是符合格式的手机号码！' }
                ]}],
                password: [
                    'password',{rules: [
                            { required: true, message: '密码不能为空！' },
                            { min: 6, max: 20, message: '密码长度必须是4~20位之间！' }
                ]}],
                nickName: [
                    'nickname',{rules: [
                            { required: true, message: '昵称不能为空！' }
                ]}],
                descr: [
                    'description',{rules: [
                            { required: true, message: '用户描述必填！' }
                ]}]
            },

            pictureUrl: '',
            imagecropperShow: false,
            imagecropperKey: 0,
        }
    },
    methods: {
        //表单提交
        handleSubmit (e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.postUser(values)
                    console.log(values)
                }
            });
        },
        //注册
        async postUser(formValue) {
            let { admin,age,description,phone,nickname,password,sex } = formValue
            try {
                let res = await this.Api.postUser({
                    admin,
                    age,
                    description,
                    phone,
                    nickname,
                    password,
                    sex,
                    avatar: this.pictureUrl
                })
                
                if(res.code === 200) {
                    this.$notification.success({ message: '注册成功！', duration: 1.5, description: '' })
                }
            } catch (error) {
                console.error(error)
            }
        },
        //头像上传
        async cropSuccess(resData) {
            this.imagecropperShow = false
            this.imagecropperKey = this.imagecropperKey + 1
            try {
                let res = await upload(resData, '/upload')
                if(res.code === 200) {
                    this.pictureUrl = res.data.pictureUrl//`http://localhost:9800${res.data.pictureUrl}`
                }
            } catch (error) {
                console.error(error)
            }
        },
        close() {
            this.imagecropperShow = false
        }
    },
    components: {
        Head,
        cropper
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

        .Update {
            width: 104px;
            height: 104px;
            border: 1px dashed #d9d9d9;
            border-radius 4px
            cursor pointer
            transition: border-color 0.3s ease;
            display flex
            flex-direction column
            justify-content center
            align-items center
            overflow hidden
            &:hover {
                border-color: #1890ff;
            }
            img {
                width 100%;
                display block
            }
        }
    }
}
</style>