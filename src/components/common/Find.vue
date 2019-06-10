<!--
 * @Date: 2019-06-10 16:34:44
 * @Author: 情雨随风
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-10 17:44:47
 * @Description: 表格头部查找组件
 -->


<template>
    <a-form
        layout="inline"
        :form="form"
        @submit="(e) => { find(e) }"
        style="margin-bottom:16px;"
    >
        <a-form-item label="作者">
            <a-select
                placeholder='请选择'
                style="min-width: 174px;"
                v-decorator="['uid']"
            >
                <a-select-option value="1">1</a-select-option>
                <a-select-option value="2">2</a-select-option>
                <a-select-option value="3">3</a-select-option>
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
        <a-form-item>
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
    data () {
        return {
            form: this.$form.createForm(this)
        }
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
        }
    }
}
</script>

<style lang="stylus" scoped>
.row {
    display  flex
    flex-wrap wrap






    
}
</style>
