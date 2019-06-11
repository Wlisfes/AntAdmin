/*
 * @Author: Parker 
 * @Date: 2019-05-05 16:16:46 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-09 22:55:35
 * @Types 笔记管理>新增笔记界面
 */

<template>
    <div class="root">
        <Head title="新增笔记"></Head>
        <div class="Back-Content">
            <a-form layout="inline" style="margin-bottom: 24px;">
                <a-form-item label="标题">
                    <a-input
                        v-decorator="[
                        'note',
                            {rules: [{ required: true, message: 'Please input your note!' }]}
                        ]"
                    />
                </a-form-item>
            </a-form>
            
            
            <MarkDown
                ref="markdown"
                :theme="markdown.theme"
                :autoSave="markdown.autoSave"
                :initialValue="markdown.initialValue"
                @on-save="save"
            ></MarkDown>

            <div class="post-content Light" v-html="markdown.Const"></div>
        </div>
    </div>
</template>

<script>
import Head from '../components/common/Head'     //OneDark
import MarkDown  from 'vue-meditor'
export default {
    data () {
        return {
            form: this.$form.createForm(this),
            //编辑器配置
            markdown: {
                theme: "OneDark",
                mode: 1,
                autoSave: false,
                initialValue: ``,
                Const: ''
            }
        }
    },
    methods: {
        save(e) {
            console.log(e)
            this.markdown.Const = e.html

            this.$refs.markdown.insertContent('\n![image](http://hacgapp.com/img/topBG.jpg)');
        },

    },
    components: {
        Head,
        MarkDown
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

        
    }
}
</style>

