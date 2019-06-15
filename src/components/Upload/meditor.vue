<!--
 * @Date: 2019-06-14 15:24:31
 * @Author: 情雨随风
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-15 16:08:54
 * @Description: 包装编辑器
 -->


<template>
    <div id="meditor" ref="meditor">
        <mark-down
            ref="markdown"
            :style="get__Styke"
            theme="OneDark"
            :toolbars="markdown.Toolcofn"
            :autoSave="markdown.autoSave"
            :initialValue="Textvalue"
            @on-save="save"
        />
        <up @crop-upload="cropSuccess" ref="ups" />
        <div class="save" v-show="showSave">
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
</template>

<script>
import up from '@/components/Upload/up'
import MarkDown  from 'vue-meditor'
export default {
    props: {
        showSave: {
            type: Boolean,
            default: () => true
        },
        Textvalue: {
            type: String,
            default: () => ""
        },
        height: {
            type: Number,
            default: () => 0
        }
    },
    data () {
        return {
            //编辑器配置
            markdown: {
                mode: 1,
                autoSave: false,
                Toolcofn: {
                    image: false
                },
                height: 600
            }
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.markdown.height = this.$refs.meditor.clientHeight
            this.$refs.ups.createDom()
        })
    },
    computed: {
        get__Styke() {
            let height = this.height
            if(height > 0) {
                return { minHeight: `${height}px`, height: `${height}px` }
            }
            else {
                return this.markdown.height > 600 ? { minHeight: '100%' } : { minHeight: '600px' }
            }
        }
    },
    methods: {
        //监听保存
        save(e) {
            this.$emit('save', e)
        },
        //清空
        Empty() {
            this.$refs.markdown.value = ''
        },
        //手动触发保存
        handleSave() {
            this.$refs.markdown.handleSave()
        },
        //图片上传
        cropSuccess(result) {
            let pathUrl = result.data.pictureUrl
            // let pathUrl = `http://admin.lisfes.cn/server/static${result.data.pictureUrl}`
            // let pathUrl = `http://localhost:9800${result.data.pictureUrl}`
            this.$refs.markdown.insertContent('\n![image]('+ pathUrl +')');
        }
    },
    components: {
        up,
        MarkDown
    }
}
</script>

<style lang="stylus" scoped>
#meditor {
    height 100%
    width 100%
    position relative
    .save {
        position absolute
        right 0
        bottom 0
    }
}
</style>

