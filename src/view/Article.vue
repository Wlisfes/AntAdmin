/*
 * @Author: Parker 
 * @Date: 2019-05-05 16:13:44 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-07 23:28:53
 * @Types 文章管理>新增文章界面
 */

<template>
    <div class="root">
        <Head title="新增文章"></Head>
        <div class="Back-Content">
            <meditor @save="save"/>

            <div class="picture">
                <div class="Update" @click="imagecropperShow = true">
                    <img :src="pictureUrl" v-if="pictureUrl" alt="" />
                    <a-icon
                        v-else
                        style="font-size: 32px;color: #999;"
                        type="plus"
                    />
                </div>
            </div>
        </div>
        <article-create-form
            :visible="visible"
            @cancel="() => { visible = false }"
            @create="createBook"
        ></article-create-form>
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
import upload from '@/Api/upload'
import Head from '@/components/common/Head'
import meditor from '@/components/Upload/meditor'
import cropper from '@/components/Upload/index'
import ArticleCreateForm from '@/components/common/ArticleCreateForm'
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
            visible: false,
            
            pictureUrl: '',
            imagecropperShow: false,
            imagecropperKey: 0
        }
    },
    methods: {
        //监听保存事件
        save({ html,theme,value }) {
            if(!this.pictureUrl) {
                this.$notification.error({ message: '请上传缩略图！', duration: 1.5, description: '' })
                return
            }
            this.mark.Text = html
            this.mark.theme = theme
            this.mark.Textvalue = value
            this.visible = true
        },
        //新增文章
        async createBook({ title,tags,weights,read,suki,description }) {
            try {
                this.visible = false
                this.$message.loading('数据发送中......', 0)
                let res = await this.Api.SubmitArticleFn({
                    theme: this.mark.theme,
                    Text: this.mark.Text,
                    Textvalue: this.mark.Textvalue,
                    picture: this.pictureUrl,
                    title,
                    tags,
                    weights,
                    read,
                    suki,
                    description
                })
                this.$message.destroy()
                console.log(res)
                if(res.code === 200) {
                    this.$notification.success({ message: '新增成功！', duration: 1.5, description: '' })
                }
            } catch (error) {
                console.error(error)
            }
        },
        //缩略图上传
        async cropSuccess(resData) {
            this.imagecropperShow = false
            this.imagecropperKey = this.imagecropperKey + 1
            try {
                let res = await upload(resData, '/upload')
                if(res.code === 200) {
                    this.pictureUrl = `http://localhost:9800${res.data.pictureUrl}`
                    // this.pictureUrl = `http://admin.lisfes.cn/server/static${res.data.pictureUrl}`
                    // this.pictureUrl = res.data.pictureUrl
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
        meditor,
        cropper,
        ArticleCreateForm
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
        .picture {
            position absolute
            right 16px
            bottom 64px
            .Update {
                width: 180px;
                height: 140px;
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
}
</style>

