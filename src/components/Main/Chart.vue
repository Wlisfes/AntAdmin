<!--
 * @Author: 情雨随风
 * @Date: 2019-06-16 14:53:01
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-20 23:48:40
 * @Description: 首页图表组件
 -->


<template>
    <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false" title="前端生态体系" :style="{ minHeight: '600px' }">
        <div slot="extra" style="height: inherit;">
            <div class="analysis-salesTypeRadio">
                <a-radio-group defaultValue="a">
                    <a-radio-button value="a" @click="Chart('Vue')">Vue</a-radio-button>
                    <a-radio-button value="b" @click="Chart('React')">React</a-radio-button>
                    <!-- <a-radio-button value="c" @click="Chart('Angular')">Angular</a-radio-button> -->
                </a-radio-group>
            </div>
        </div>
        <div>
            <div id="mchart"></div>    
        </div>
    </a-card>
</template>

<script>
import echarts from 'echarts'
import Option from './ChartOption'
export default {
    data() {
        return {
            loading: false
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.Chart('Vue')
        })
    },
    methods: {
        //图表初始化
        Chart(key) {
            var dom = echarts.init(document.getElementById("mchart"))
            dom.setOption(Option[key], true)
        }
    }
}
</script>

<style lang="stylus" scoped>
#mchart {
    height 460px
    text-align center
}
</style>
