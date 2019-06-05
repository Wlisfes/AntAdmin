/*
 * @Author: Parker 
 * @Date: 2019-05-05 11:25:39 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-17 17:56:32
 * @Types 登录界面
 */


<template>
    <div class="container" :style="Style">
        <div class="content">
            <img class="logo" src="../assets/image/logo.png" alt="" />
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
                        <a-input size="large" placeholder="手机号：18888888888" v-decorator="rules.phone">
                        <a-icon slot="prefix" type="user" />
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input size="large" placeholder="密码：000000" type="password" v-decorator="rules.password">
                        <a-icon slot="prefix" type="lock" />
                        </a-input>
                    </a-form-item>
                    <div>
                        <a-checkbox checked style="color: #fff;">自动登录</a-checkbox>
                        <a style="float: right;color: #fff;">忘记密码</a>
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
const backUrl = require("@/assets/image/topBG.png")
export default {
    data() {
        return {
            logging: false,
            form: this.$form.createForm(this),
            rules: {
                phone: [ "phone", {
                        rules: [
                            { required: true, message: '用户名不能为空！' },
                    ]}
                ],
                password: [ "password", {
                        rules: [
                            { required: true, message: '密码不能为空！' }
                    ]}
                ]
            }
        }
    },
    computed: {
        Style: () => ({
            background: `url(${backUrl}) no-repeat center`,
            backgroundSize: `cover`
        })
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    this.login(values)
                }
            })
        },
        //登录
        async login({ phone,password }) {
            try {
                this.logging = true
                var res = await this.Api.loginFN({
                    phone,password
                })

                console.log(res)
                
                if (res.code === 200) {
                    this.Aux.setToken(res.data)
                    this.$message.success(res.message)
                    this.$router.push({ path: `/` })
                } else {
                    this.$message.error(res.message)
                }
                this.logging = false
            } catch (error) {
                console.log(error)
                this.logging = false
                this.$message.error('登录失败！')
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
    // background #f0f2f5 url('https://gw.alipayobjects.com/zos/rmsportal/TVYTbAXWheQpRcWDaDMu.svg') no-repeat center 110px
    // background url('http://hacgapp.com/img/topBG.jpg') no-repeat center
    // background-size cover
    .content {
        padding 80px 0
        flex 1
        display flex
        flex-direction column
        align-items center
        .top {
            text-align center
            margin-top 30px
            .header {
                line-height 44px
                margin-bottom 40px
                .title {
                    font-size 33px
                    color #ffffff
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
    .logo {
        width 200px
        height 200px
        animation logo 10s linear 0s infinite
        @keyframes logo {
            0% {
                transform rotate(0deg)
            }
            100% {
                transform rotate(360deg)
            }
        }
    }
}
</style>

