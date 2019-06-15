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
            <meditor @save="save"/>
        </div>
        <notes-create-form
            :visible="visible"
            @cancel="() => { visible = false }"
            @create="createBook"
        ></notes-create-form>
    </div>
</template>

<script>
import Head from '@/components/common/Head'     //OneDark
import meditor from '@/components/Upload/meditor'
import NotesCreateForm from '@/components/common/NotesCreateForm'
export default {
    data () {
        return {
            //编辑器save
            mark: {
                Text: '',
                Textvalue: '',
                theme: 'OneDark'
            },
     
            //弹窗
            visible: false
            
        }
    },
    methods: {
        //监听保存事件
        save({ html,theme,value }) {
            this.mark.Text = html
            this.mark.theme = theme
            this.mark.Textvalue = value
            this.visible = true
        },
        //新增笔记
        async createBook({ name,description,tags,weights }) {
            try {
                this.visible = false
                this.$message.loading('数据发送中......', 0)
                let res = await this.Api.SubmitBookFn({
                    name,
                    theme: this.mark.theme,
                    Text: this.mark.Text,
                    Textvalue: this.mark.Textvalue,
                    tags,
                    weights,
                    description
                })
                this.$message.destroy()
                if(res.code === 200) {
                    this.$notification.success({ message: '新增成功！', duration: 1.5, description: '' })
                }
            } catch (error) {
                console.error(error)
            }
        }
    },
    components: {
        Head,
        meditor,
        NotesCreateForm
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
        margin 16px 16px 0
        flex 1
        display flex
        flex-direction column
        background #ffffff
        padding 16px
        position relative
    }
}
</style>

