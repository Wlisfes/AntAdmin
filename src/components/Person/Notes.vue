<!--
 * @Author: 情雨随风
 * @Date: 2019-06-20 22:24:37
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-22 00:03:43
 * @Description: 个人中心的笔记
 -->


<template>
  <a-list
        size="large"
        rowKey="id"
        :loading="loading"
        itemLayout="vertical"
        :dataSource="TableData"
    >
        <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
            <a-list-item-meta>
                <a slot="title">{{ item.name }}</a>
                <template slot="description">
                    <span>
                        <a-tag 
                            v-for="t in item.tags" 
                            :key="t.id"
                            :color="t.color"
                        >{{ t.name }}</a-tag>
                    </span>
                </template>
            </a-list-item-meta>
            <template>
                <div class="antd-pro-components-article-list-content-index-listContent">
                    <div class="description" v-html="item.description"></div>
                    <div class="extra">
                        <a-avatar :src="get_Token.avatar" size="small" />
                        <a>{{ item.author }}</a>
                        <em>{{ item.createdAt | Time | TimeEnd }}</em>
                    </div>
                </div>
            </template>
        </a-list-item>
        <div slot="footer" v-if="TableData.length > 0" style="text-align: center; margin-top: 16px;">
            <a-spin v-if="loadingMore && ents < alltiesData.length" />
            <a-button v-else-if="!loadingMore && ents < alltiesData.length" @click="loadMore">加载更多</a-button>
            <span v-else>
                <a-icon type="frown" />
                没有更多了
            </span>
        </div>
    </a-list>
</template>

<script>
import IconText from './IconText';
import { Time } from '@/lib/filters';
import { mapGetters } from 'vuex'
export default {
    name: 'Notes',
    data () {
        return {
            loading: true,
            loadingMore: false,
            ents: 1,
            alltiesData: [],
            TableData: []
        }
    },
    mounted () {
        this.UidBook()

    },
    filters: {
        Time: (v) => Time(v),
        TimeEnd: (v) => {
            return v.slice(0, v.length - 4)
        }
    },
    computed: {
        ...mapGetters([
            'get_Token'
        ])
    },
    methods: {
        async UidBook() {
            try {
                this.loading = true
                let res = await this.Api.UidBook()
                if(res.code === 200) {
                    if(res.data.length < 6) {
                        this.TableData = res.data
                    }
                    else {
                        let allties = this.sliceArray(v, 5)
                        this.TableData = allties[0]
                        this.alltiesData = allties
                    }
                }
            } catch (error) {
                console.error(error)
            }
            this.loading = false
        },
        //数组分割
        sliceArray(array, size) {
            var result = [];
            for (var x = 0; x < Math.ceil(array.length / size); x++) {
                var start = x * size;
                var end = start + size;
                result.push(array.slice(start, end));
            }
            return result;
        },
        //加载更多
        loadMore () {
            let ents = this.ents
            let alltiesData = this.alltiesData

            if(ents >= alltiesData.length) return
            this.loadingMore = true
            setTimeout(() => {
                this.TableData = this.TableData.concat(alltiesData[ents])
                ents ++
                this.ents = ents
                this.loadingMore = false
                this.$nextTick(() => {
                    window.dispatchEvent(new Event('resize'))
                })
            }, 1500)
        }
    },
    components: {
        IconText
    }
}
</script>

<style lang="stylus" scoped>
.antd-pro-components-article-list-content-index-listContent {
    .description {
        max-width: 720px;
        line-height: 22px;
    }
    .extra {
        margin-top: 16px;
        color: rgba(0,0,0,.45);
        line-height: 22px;

        & /deep/ .ant-avatar {
            position: relative;
            top: 1px;
            width: 20px;
            height: 20px;
            margin-right: 8px;
            vertical-align: top;
        }
        & > em {
            margin-left: 16px;
            color: rgba(0,0,0,.25);
            font-style: normal;
        }
    }
}
</style>