<!--
 * @Date: 2019-06-10 16:34:44
 * @Author: 情雨随风
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-16 20:40:04
 * @Description: 表格头部查找组件
 -->


<template>
    <a-form
        layout="inline"
        :form="form"
        @submit="(e) => { find(e) }"
        class="find"
    >
        <a-form-item label="作者" v-show="uservisible">
            <a-select
                placeholder='请选择'
                style="min-width: 174px;"
                v-decorator="['uid']"
            >
                <a-select-option
                    v-for="at in Author"
                    :key="at.uid"
                    :value="at.uid"
                >
                    {{ at.nickname }}
                </a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="状态">
            <a-select
                placeholder='请选择'
                style="min-width: 174px;"
                v-decorator="['status']"
            >
                <a-select-option value="0">
                    <a-badge status="error" text="已删除" />
                </a-select-option>
                <a-select-option value="1">
                    <a-badge status="warning" text="已关闭" />
                </a-select-option>
                <a-select-option value="2">
                    <a-badge status="success" text="已发布" />
                </a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="日期">
            <a-range-picker
                v-decorator="['rangePicker', {
                    rules: [{ type: 'array' }]
                }]"
            >
                <a-icon slot="suffixIcon" type="smile" />
            </a-range-picker>
        </a-form-item>
        <a-form-item>
            <a-button
                type="primary"
                icon='search'
                html-type="submit"
            >查询</a-button>
        </a-form-item>
        <a-form-item v-show="plusvisible">
            <a-button
                @click="() => { plus() }"
                type="primary"
                icon='plus-circle'
            >新增</a-button>
        </a-form-item>
        <a-form-item>
            <a-button
                @click="() => { reply() }"
                icon='sync'
            >重置</a-button>
        </a-form-item>
    </a-form>
</template>

<script>
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export default {
    props: {
        plusvisible: {
            type: Boolean,
            default: () => true
        },
        uservisible: {
            type: Boolean,
            default: () => true
        }
    },
    data () {
        return {
            form: this.$form.createForm(this),

            //作者列表
            Author: []
        }
    },
    created() {
        this.getUserListFn()
    },
    methods: {
        //查询
        find(e) {
            e.preventDefault();
            this.form.validateFields((err, fieldsValue) => {
                if(err) return
                let h = ((props) => {
                    let v = {}
                    for(let k in props) {
                        if(props[k]) {
                            if(k == 'rangePicker') {
                                const t = fieldsValue['rangePicker']
                                v.first = t[0].format('YYYY-MM-DD'),
                                v.last = t[1].format('YYYY-MM-DD')
                            }
                            else {
                                v[k] = props[k]
                            }
                        }
                    }
                    return v
                })(fieldsValue)
                this.$emit('find', h)
            })
        },
        //新增
        plus() {
            this.$emit('plus')
        },
        //重置
        reply() {
            this.$emit('reply')
            this.form.resetFields()
        },
        //用户列表
        async getUserListFn() {
            try {
                let res = await this.Api.getUserListFn()
                if (res.code === 200) {
                    this.Author = res.data
                }
            } catch (error) {
                console.error(error)
            }
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
