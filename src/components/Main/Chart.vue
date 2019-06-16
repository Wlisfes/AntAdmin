<!--
 * @Author: 情雨随风
 * @Date: 2019-06-16 14:53:01
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-16 15:56:31
 * @Description: 首页图表组件
 -->


<template>
    <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false" title="销售额类别占比" :style="{ minHeight: '600px' }">
        <div slot="extra" style="height: inherit;">
            <div class="analysis-salesTypeRadio">
                <a-radio-group defaultValue="a">
                    <a-radio-button value="a" @click="Chart('mchart', 1245)">全部渠道</a-radio-button>
                    <a-radio-button value="b" @click="Chart('mchart', 998)">线上</a-radio-button>
                    <a-radio-button value="c" @click="Chart('mchart', 888)">门店</a-radio-button>
                </a-radio-group>
            </div>
        </div>
        <h4>销售额</h4>
        <div>
            <div id="mchart"></div>    
        </div>
    </a-card>
</template>

<script>
import echarts from 'echarts'

export default {
    data() {
        return {
            loading: false
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.Chart('mchart')
        })
    },
    methods: {
        //图表初始化
        Chart(Element, n) {
            var dom = echarts.init(document.getElementById(Element))
            dom.setOption({
                // title : {
                //     text: '某站点用户访问来源',
                //     subtext: '纯属虚构',
                //     x:'center'
                // },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['刀剑神域','罪恶王冠','冰果','多罗罗','魔法禁书目录']
                },
                series : [
                    {
                        name: '人数占比',
                        type: 'pie',
                        radius : '55%',
                        center: ['50%', '60%'],
                        data:[
                            {
                                value: 335,
                                name: '刀剑神域',
                                itemStyle: {
                                    normal: { color: '#319AFF' }
                                }
                            },
                            {
                                value: 310,
                                name: '罪恶王冠',
                                itemStyle: {
                                    normal: { color: '#1BD175' }
                                }
                            },
                            {
                                value: 234,
                                name: '冰果',
                                itemStyle: {
                                    normal: { color: '#ED3F14' }
                                }
                            },
                            {
                                value: 135,
                                name: '多罗罗',
                                itemStyle: {
                                    normal: { color: '#E46CBB' }
                                }
                            },
                            {
                                value: n || 698,
                                name: '魔法禁书目录',
                                itemStyle: {
                                    normal: { color: '#A970FA' }
                                }
                            }
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }, true)

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
