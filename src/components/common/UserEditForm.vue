<!--
 * @Author: 情雨随风
 * @Date: 2019-06-15 10:14:03
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-15 13:48:58
 * @Description: 用户资料编辑弹窗
 -->


<template>
    <a-modal
        :visible="visible"
        title='编辑用户信息'
        cancelText="取消"
        okText='保存'
        :centered='true'
        :width='960'
        @cancel="cancel"
        @ok="create"
    >
        <a-form :form="form">
            <!-- <a-form-item v-bind="formItemLayout" label='手机号'>
                <a-input
                    placeholder="请输入手机号"
                    v-decorator="['phone',{
                        initialValue: phone,
                        rules: [
                            { required: true, message: '手机号不能为空！' },
                            { pattern: /^1([38][0-9]|4[012345789]|5[0-3,4-9]|6[6]|7[01345678]|9[89])\d{8}$/, message: '必须是符合格式的手机号码！' }
                        ]
                    }]"
                >
                    <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item> -->
            <a-form-item v-bind="formItemLayout" label='密码'>
                <a-input
                    placeholder="请输入密码"
                    v-decorator="['password',{
                        initialValue: password,
                        rules: [
                            { required: true, message: '密码不能为空！' },
                            { min: 6, max: 20, message: '密码长度必须是4~20位之间！' }
                        ]
                    }]"
                >
                    <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
                </a-input>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="账户类型">
                <a-radio-group
                    v-decorator="['admin',{
                            initialValue: admin,
                        }]">
                        <a-radio value="same" checked>测试管理员</a-radio>
                        <a-radio value="admin">超级管理员</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="用户昵称">
                <a-input
                    placeholder="请输入用户昵称"
                    v-decorator="['nickname',{
                        initialValue: nickname,
                        rules: [{ required: true, message: '请输入用户昵称!' }],
                    }]"
                />
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="用户性别">
                <a-radio-group
                    v-decorator="['sex',{
                            initialValue: sex
                        }]">
                        <a-radio :value="2" checked>男</a-radio>
                        <a-radio :value="1">女</a-radio>
                </a-radio-group>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label="用户年龄">
                <el-input-number
                    controls-position="right"
                    :min="1"
                    :max="99"
                    size="small"
                    :precision="0"
                    v-decorator="['age',{
                        initialValue: age
                    }]"
                ></el-input-number>
            </a-form-item>
            <a-form-item label="头像" v-bind="formItemLayout">
                <div class="Update" @click="imagecropperShow = true">
                    <div class="Avatar" v-if="avatar">
                        <img :src="avatar" alt=""/>
                        <!-- <div class="UpMack">
                            <a-icon style="font-size: 32px;color: #fff;" type="plus" />
                        </div> -->
                    </div>
                    <a-icon v-else style="font-size: 32px;color: #999;" type="plus" />
                </div>
                <span>暂不支持头像更换</span>
            </a-form-item>
            <a-form-item v-bind="formItemLayout" label='说明'>
                <a-textarea
                    placeholder="请输入账户说明"
                    :rows="4"
                    v-decorator="['description',{
                        initialValue: description,
                        rules: [{ required: true, message: '请输入账户说明!' }],
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
        uid: {
            type: String,
            default: () => ''
        },
        phone: {
            type: Number,
            default: () => 0
        },
        password: {
            type: String,
            default: () => ''
        },
        admin: {
            type: String,
            default: () => 'same'
        },
        nickname: {
            type: String,
            default: () => ''
        },
        sex: {
            type: Number,
            default: () => 1
        },
        age:{
            type: Number,
            default: () => 18
        },
        avatar: {
            type: String,
            default: () => ''
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
            },
            UpMack: false
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
                this.$emit('create', { ...values, uid: this.uid })
                this.form.resetFields();
            });
        }
    }
}
</script>

<style lang="stylus" scoped>
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
    .Avatar {
        width 100%
        height 100%
        display block
        position relative
        overflow hidden
        img {
            width 100%
            display block
        }
        .UpMack {
            position absolute
            left 0
            top 0
            right 0
            bottom 0
            background-color rgba(0,0,0,.5)
            display none
            align-items center
            justify-content center
            transition all .3s 
        }
    }
    
}
.Avatar:hover .UpMack{
    display flex
}



</style>

