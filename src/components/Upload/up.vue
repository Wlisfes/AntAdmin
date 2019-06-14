<!--
 * @Date: 2019-06-14 13:54:12
 * @Author: 情雨随风
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-14 17:24:41
 * @Description: 富文本扩展插件
 -->


<template>
    <div ref="ups"></div>
</template>

<script>
import upload from '@/Api/upload'
export default {
    props: ['dom'],
    data () {
        return {
            
        }
    },
    methods: {
        //创建image上传工具
        createDom() {
            let li = this.spanElement('li', { name: '图片' })
            let span = this.spanElement('span', { class: 'iconfont icon-img' })
            let input = this.spanElement('input', {
                type: 'file',
                accept: "image/gif,image/jpeg,image/jpg,image/png,image/svg"
            })
            li.appendChild(span)
            document.querySelector('.markdown-toolbars').insertBefore(li,
                document.querySelectorAll('.markdown-toolbars li')[15]
            )
            span.addEventListener('click', (e) => {
                input.click()
            }, false)
            input.addEventListener('change', (e) => {
                const file = e.target.files[0]
                let fmData = new FormData()
                    fmData.append('field', file);
                    this.cropSuccess(fmData)

            }, false)
        },
        //创建dom
        spanElement(dom, attr) {
            const El = document.createElement(dom)
                for(let k in attr) {
                    El.setAttribute(k, attr[k])
                }
            return El
        },
        //图片上传
        async cropSuccess(resData) {
            try {
                let res = await upload(resData, '/upload')
                if(res.code === 200) {
                    this.$emit('crop-upload', res)
                }
            } catch (error) {
                console.error(error)
            }
        }
    }
}
</script>


