/*
 * @Author: Parker 
 * @Date: 2019-05-05 11:25:39 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-11 01:05:54
 * @Types 登录界面
 */


<template>
    <div class="container">
        <div class="content">
            <div class="top">
                <div class="header">
                    <span class="title"> Admin 管理系统</span>
                </div>
            </div>
        <div class="login">
            <a-form 
                :form="form"
                @submit="handleSubmit"
            >
                <a-form-item>
                    <a-input size="large" placeholder="admin" v-decorator="rules.username">
                    <a-icon slot="prefix" type="user" />
                    </a-input>
                </a-form-item>
                <a-form-item>
                    <a-input size="large" placeholder="888888" type="password" v-decorator="rules.password">
                    <a-icon slot="prefix" type="lock" />
                    </a-input>
                </a-form-item>
                <div>
                    <a-checkbox checked>自动登录</a-checkbox>
                    <a style="float: right">忘记密码</a>
                </div>
                <a-form-item>
                    <a-button 
                        :loading="logging" 
                        html-type="submit" 
                        style="width: 100%;margin-top: 24px" 
                        size="large" 
                        type="primary"
                    >
                        登录
                    </a-button>
                </a-form-item>
            </a-form>
        </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'login',
    data() {
        return {
            logging: false,
            form: this.$form.createForm(this),
            rules: {
                username: [
                    "username",
                    {
                        rules: [
                            { required: true, message: '用户名不能为空！' },
                            { min: 4, max: 8, message: '用户名长度必须在4~8位之间！' }
                        ]
                    }
                ],
                password: [
                    "password",
                    {
                        rules: [
                            { required: true, message: '密码不能为空！' },
                            { min: 6, max: 20, message: '密码长度必须在3~20位之间！' }
                        ]
                    }
                ]
            }
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.AdminEnrolment(values)
                }
            })
        },
        //注册
        async AdminEnrolment({ username,password }) {
            try {
                var res = await this.Api.AdminEnrolment({
                    username,password
                })
                console.log(res)
            } catch (error) {
                console.error(error)
                return
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
  .container {
    display flex
    flex-direction column
    height 100vh
    overflow auto
    background #f0f2f5 url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg') no-repeat center 110px
    background-size 100%
    .content {
        padding 110px 0
        flex 1
        .top {
            text-align center
            .header {
                line-height 44px
                margin-bottom 40px
                .title {
                    font-size 33px
                    color rgba(0,0,0,.85)
                    font-family 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif
                    font-weight 600
                    position relative
                    top 2px
                }
            }
        }
        .login{
            width 368px
            margin 0 auto
            @media screen and (max-width: 576px) {
                width 95%
            }
            @media screen and (max-width: 320px) {
                .captcha-button {
                    font-size 14px
                }
            }
        }
    }
}
</style>

