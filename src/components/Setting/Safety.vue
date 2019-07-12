<!--
 * @Author: 情雨随风
 * @Date: 2019-06-22 13:05:06
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-22 18:37:09
 * @Description: 账户设置>安全设置
 -->


<template>
    <div class="Safety">
        <div class="Safety-title">
            <span>安全设置</span>
        </div>
        <a-form :form="form" @submit="handleSubmit" style="max-width: 500px; ">
            <a-form-item label="修改密码">
                <a-input 
                    placeholder="请输入新密码" 
                    type="password" 
                    v-decorator="['password',
                    {rules: [
                            { required: true, message: '密码不能为空！' },
                            { min: 6, max: 20, message: '密码长度必须是4~20位之间！' }
                    ]}]"
                />
            </a-form-item>
            <a-form-item>
                <a-input 
                    placeholder="请再次输入新密码" 
                    type="password" 
                    v-decorator="['twopassword',
                        {rules: [
                            { required: true, message: '密码不能为空！' },
                            { min: 6, max: 20, message: '密码长度必须是4~20位之间！' }
                    ]}]"
                />
            </a-form-item>

            <a-form-item>
                <a-button type="primary" html-type="submit">保存</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: this.$form.createForm(this),
            itemClo: {
                labelCol: {
                    span: 2
                },
                wrapperCol: {
                    span: 12
                }
            }
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault();
            this.form.validateFields((err, values) => {
                if (!err) {
                    if(values.password === values.twopassword) {
                        this.UpdateUidPssw(values.password)
                        this.form.resetFields()
                    }
                    else {
                        this.$notification.error({
                            message: '两次输入的密码不一致！',
                            duration: 1.5,
                            description: ''
                        })
                    } 
                }
            });
        },
        async UpdateUidPssw(password) {
            try {
                let res = await this.Api.UpdateUidPssw({
                    password
                })

                if(res.code === 200) {
                    this.$notification.success({ message: '修改成功！', duration: 1.5, description: '' })
                }
            } catch (error) {
                console.error(error)
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
.Safety-title {
    font-weight 500
    color rgba(0,0,0,.85)
    line-height 28px
    font-size 20px
    margin-bottom 12px
}
</style>
