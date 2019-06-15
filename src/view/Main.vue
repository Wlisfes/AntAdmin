/*
 * @Author: Parker 
 * @Date: 2019-05-05 16:24:40 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-05 16:25:14
 * @Types 后台默认界面
 */

<template>
    <div class="Main">
        <user-item></user-item>
        <div class="Back-Content">
            <a-row :gutter="16">
                <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
                    <a-card
                        class="project-list"
                        :loading="loading"
                        style="margin-bottom: 16px;"
                        :bordered="false"
                        title="进行中的项目"
                        :body-style="{ padding: 0 }"
                        
                    >
                        <a slot="extra">全部项目</a>
                        <div>
                            <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in projects">
                                <a-card :bordered="false" :body-style="{ padding: 0 }">
                                    <a-card-meta>
                                        <div slot="title" class="card-title">
                                            <a-avatar size="small" :src="item.cover"/>
                                            <a>{{ item.title }}</a>
                                        </div>
                                        <div slot="description" class="card-description">
                                            {{ item.description }}
                                        </div>
                                    </a-card-meta>
                                    <div class="project-item">
                                        <a href="javascript:;">菜鸟前端组</a>
                                        <span class="datetime">9小时前</span>
                                    </div>
                                </a-card>
                            </a-card-grid>
                        </div>
                    </a-card>

                    <a-card :loading="loading" title="动态" :bordered="false">
                        <a-list>
                            <a-list-item :key="index" v-for="(item, index) in activities">
                                <a-list-item-meta>
                                    <a-avatar slot="avatar" :src="item.avatar" />
                                    <div slot="title">
                                        {{ item.nickname }} 在 <a v-html="item.team"></a> 更新 <a v-html="item.commit"></a>
                                    </div>
                                    <div slot="description">{{ item.time }}</div>
                                </a-list-item-meta>
                            </a-list-item>
                        </a-list>
                    </a-card>
                </a-col>


                <a-col :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
                    <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :loading="loading" :bordered="false" title="销售额类别占比" :style="{ minHeight: '600px' }">
                        <div slot="extra" style="height: inherit;">
                            <div class="analysis-salesTypeRadio">
                                <a-radio-group defaultValue="a">
                                    <a-radio-button value="a" @click="Chart('mchart', 688)">全部渠道</a-radio-button>
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
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
import UserItem from '@/components/common/UserItem'
export default {
    data() {
        return {
            projects: [],
            activities: [],
            loading: false
        }
    },
    created() {
        let s = []
        for(let i = 1; i < 7; i++) {
            s.push({
                cover: "http://localhost:9800/assets/album/598cc998f3e7b.png",
                description: "那是一种内在的东西， 他们到达不了，也无法触及的",
                id: i,
                status: 1,
                title: "Admin",
                updatedAt: "2018-07-26 00:00:00",
            })
        }

        this.projects = s

        let v = [
            {
                id: 1,
                avatar: "http://localhost:9800/assets/album/598cc998f3e7b.png",
                nickname: "情雨随风",
                team: "AntAdmin",
                commit: "修改img路径",
                time: "2019-06-16 14:47:00"
            },
            {
                id: 2,
                avatar: "http://localhost:9800/assets/album/598cc998f3e7b.png",
                nickname: "情雨随风",
                team: "AntAdmin",
                commit: "分类vuex配置",
                time: "2019-06-15 22:55:00"
            },
            {
                id: 3,
                avatar: "http://localhost:9800/assets/album/598cc998f3e7b.png",
                nickname: "情雨随风",
                team: "AntAdmin",
                commit: "完善注册界面、用户管理界面",
                time: "2019-06-15 23:23:53"
            },
            {
                id: 5,
                avatar: "http://localhost:9800/assets/album/598cc998f3e7b.png",
                nickname: "情雨随风",
                team: "AntAdmin",
                commit: "优化图片上传组件",
                time: "2019-06-14 00:23:53"
            },
            {
                id: 6,
                avatar: "http://localhost:9800/assets/album/598cc998f3e7b.png",
                nickname: "情雨随风",
                team: "AntAdmin",
                commit: "新增图片裁剪、新增图片上传接口",
                time: "2019-06-14 23:54:12"
            }
        ]

        this.activities = v
    },
    mounted() {
        this.$nextTick(() => {
            this.Chart('mchart')
        })
    },
    methods: {
        Chart(Element, n) {
            var dom = echarts.init(document.getElementById(Element))
            dom.setOption({
                title : {
                    text: '某站点用户访问来源',
                    // subtext: '纯属虚构',
                    x:'center'
                },
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
    },
    components: {
        UserItem
    }
}
</script>


<style lang="stylus" scoped>
.Main {
    margin 0 -24px
    flex 1
    display flex
    flex-direction column
    .Back-Content{
        margin 16px 16px 0
        flex 1
        display flex
        flex-direction column
        // background #ffffff
        // padding 16px

        .project-list {
            .card-title {
                font-size: 0;
                a {
                    color: rgba(0, 0, 0, 0.85);
                    margin-left: 12px;
                    line-height: 24px;
                    height: 24px;
                    display: inline-block;
                    vertical-align: top;
                    font-size: 14px;
                    &:hover {
                        color: #1890ff;
                    }
                }
            }
            .card-description {
                color: rgba(0, 0, 0, 0.45);
                height: 44px;
                line-height: 22px;
                overflow: hidden;
            }
            .project-item {
                display: flex;
                margin-top: 8px;
                overflow: hidden;
                font-size: 12px;
                height: 20px;
                line-height: 20px;
                a {
                    color: rgba(0, 0, 0, 0.45);
                    display: inline-block;
                    flex: 1 1 0;
                    &:hover {
                        color: #1890ff;
                    }
                }
                .datetime {
                    color: rgba(0, 0, 0, 0.25);
                    flex: 0 0 auto;
                    float: right;
                }
            }
            .ant-card-meta-description {
                color: rgba(0, 0, 0, 0.45);
                height: 44px;
                line-height: 22px;
                overflow: hidden;
            }
        }
        
    }
    #mchart {
        height 460px
        text-align center
    }
}
</style>
