<!--
 * @Author: 情雨随风
 * @Date: 2019-06-16 12:39:53
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-16 15:54:15
 * @Description: 首页>动态组件
 -->


<template>
    <a-card :loading="loading" title="动态" :bordered="false" style="margin-bottom: 16px;">
        <a-list :locale="{ emptyText: '暂无动态' }">
            <a-list-item :key="index" v-for="(item, index) in activities">
                <a-list-item-meta>
                    <a-avatar slot="avatar" :src="item.avatar_url" />
                    <div slot="title">
                        <span>{{ item.author.name }} 在 </span>
                        <a :href="item.depot_url" target="_blank" v-html="item.depot"></a>
                        <span> 更新 </span>
                        <a :href="item.html_url" target="_blank" v-html="item.message"></a>
                    </div>
                    <div slot="description">{{ item.author.date | Time }}</div>
                </a-list-item-meta>
            </a-list-item>
            <div
                v-if="showLoadingMore"
                slot="loadMore"
                :style="{
                    textAlign: 'center',
                    marginTop: '12px',
                    height: '32px',
                    lineHeight: '32px'
                }"
            >
                <a-spin v-if="loadingMore && ents < allties.length" />
                <a-button v-else-if="!loadingMore && ents < allties.length" @click="onLoadMore">加载更多</a-button>
                <span v-else>最多显示30条记录</span>
            </div>
        </a-list>
    </a-card>
</template>

<script>
import { Time } from '@/lib/filters'
export default {
    data() {
        return {
            //动态列表
            activities: [],
            allties: [],
            loading: true,

            //加载更多配置
            ents: 1,
            showLoadingMore: true,
            loadingMore: false
        }
    },
    created() {
        this.Commits()
    },
    filters: {
        Time: (date) => Time(date)
    },
    methods: {
        //获取github仓库动态
        async Commits() {
            try {
                let res = await this.Api.Commits()
                let v = res.map(el => {
                    let t = el.url.slice(el.url.indexOf('Wlisfes') + 8, el.url.indexOf('commits') - 1)
                    return {
                        sha: el.sha,
                        shaurl: el.url,
                        githublogin: el.committer.login,
                        html_url: el.html_url,
                        author: el.commit.author,
                        avatar_url: el.committer.avatar_url,
                        message: el.commit.message,
                        depot: t,
                        depot_url: `https://github.com/Wlisfes/${t}`
                    }
                })
                let allties = this.sliceArray(v, 6)
                this.activities = allties[0]
                this.allties = allties
                
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
        onLoadMore() {
            let ents = this.ents
            let allties = this.allties

            if(ents >= allties.length) return
            this.loadingMore = true
            setTimeout(() => {
                this.activities = this.activities.concat(allties[ents])
                ents ++
                this.ents = ents
                this.loadingMore = false
                this.$nextTick(() => {
                    window.dispatchEvent(new Event('resize'))
                })
            }, 1500)
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
