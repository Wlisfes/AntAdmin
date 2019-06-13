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
        <div class="Back-Content" ref="Content">
            <mark-down
                ref="markdown"
                :style="get__Styke"
                theme="OneDark"
                :autoSave="markdown.autoSave"
                :initialValue="markdown.initialValue"
                @on-save="save"
            ></mark-down>
            <div class="save">
                <a-button
                    @click="Empty"
                    icon="sync"
                    style="margin-right: 16px;"
                >清空</a-button>
                <a-button
                    @click="handleSave"
                    type="primary"
                    icon="save"
                >保存</a-button>
            </div>
        </div>
        <notes-create-form
            :visible="pushModal.visible"
            @cancel="() => { pushModal.visible = false }"
            @create="createBook"
        ></notes-create-form>
    </div>
</template>

<script>
import Head from '@/components/common/Head'     //OneDark
import NotesCreateForm from '@/components/common/NotesCreateForm'
import MarkDown  from 'vue-meditor'
export default {
    data () {
        return {
            //编辑器配置
            markdown: {
                mode: 1,
                autoSave: false,
                initialValue: ``,
                Text: '',
                Textvalue: '',
                theme: 'OneDark',
                height: 600
            },
            
            //新增弹窗配置
            pushModal: {
                visible: false
            }
            
        }
    },
    created() {
        this.getTagsOpenListFn()
    },
    mounted () {
        this.$nextTick(() => {
            this.markdown.height = this.$refs.Content.clientHeight
        })
    },
    computed: {
        get__Styke() {
            return this.markdown.height > 600 ? { minHeight: '100%' } : { minHeight: '600px' }
        }
    },
    methods: {
        //监听保存事件
        save(e) {
            this.markdown.Text = e.html
            this.markdown.theme = e.theme
            this.markdown.Textvalue = e.value
            this.pushModal.visible = true
            // this.$refs.markdown.insertContent('\n![image](http://hacgapp.com/img/topBG.jpg)');
        },
        //清空
        Empty() {
            this.$refs.markdown.value = ''
        },
        //手动触发保存
        handleSave() {
            this.$refs.markdown.handleSave()
        },
        //新增笔记
        async createBook({ name,description,tags,weights }) {
            try {
                this.Empty()
                this.pushModal.visible = false
                this.$message.loading('数据发送中......', 0)
                let res = await this.Api.SubmitBookFn({
                    name,
                    theme: this.markdown.theme,
                    Text: this.markdown.Text,
                    Textvalue: this.markdown.Textvalue,
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
        },
        //标签列表
        async getTagsOpenListFn() {
            try {
                let res = await this.Api.getTagsOpenListFn()

                if(res.code === 200) {
                    this.tagse = res.data
                }
            } catch (error) {
                console.log(error)
            }
        }
    },
    components: {
        Head,
        MarkDown,
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
        margin 24px 24px 0
        flex 1
        display flex
        flex-direction column
        background #ffffff
        padding 16px
        position relative
        .save {
            position absolute
            right 16px
            bottom 16px
        }
    }
}
</style>

