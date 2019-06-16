<!--
 * @Author: 情雨随风
 * @Date: 2019-06-16 14:48:03
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-16 15:54:08
 * @Description: 进行中的项目
 -->


<template>
    <a-card
        class="project-list"
        :loading="loading"
        style="margin-bottom: 16px;"
        :bordered="false"
        title="项目列表"
        :body-style="{ padding: 0 }"
        
    >
        <!-- <a slot="extra">全部项目</a> -->
        <div>
            <a-card-grid class="project-card-grid" :key="i" v-for="(item, i) in projects">
                <a-card :bordered="false" :body-style="{ padding: 0 }">
                    <a-card-meta>
                        <div slot="title" class="card-title">
                            <a-avatar size="small" :src="item.avatar"/>
                            <a :href="item.github" target="_blank" v-html="item.name"></a>
                        </div>
                        <div slot="description" class="card-description">
                            {{ item.description }}
                        </div>
                    </a-card-meta>
                    <div class="project-item">
                        <a href="javascript:;">{{ item.author }}</a>
                        <span class="datetime"
                              style="display: flex;align-items: center;margin-right: 12px"        
                        >
                            <a-badge
                                :status="item.status | statusType"
                                :text="item.status | statusText"
                            ></a-badge>
                        </span>
                        <span class="datetime" style="">{{ item.updatedAt | Ftime }}</span>
                    </div>
                </a-card>
            </a-card-grid>
        </div>
    </a-card>
</template>

<script>
import { statusType,statusText,Ftime } from '@/lib/filters';
export default {
    data() {
        return {
            projects: [],
            loading: true
        }
    },
    created() {
        this.__getTaskeListFn()
    },
    filters: {
        statusType: (v) => statusType(v),
        statusText: (v) => statusText(v),
        Ftime: (v) => Ftime(v)
    },
    methods: {
        //获取项目列表
        async __getTaskeListFn() {
            try {
                let res = await this.Api.getTaskeListFn()
                if(res.code === 200) {
                    let m = this.TableMap(res.data)
                    if(m.length > 6) {
                        this.projects = m.slice(0, 6)
                    }
                    else {
                        this.projects = m
                    }
                }
            } catch (error) {
                console.error(error)
            }
            this.loading = false
        },
        //数据格式化
        TableMap(arr) {
            if(!Array.isArray(arr)) return [];
            let v = arr.map(v => ({
                key: v.id,
                id: v.id,
                name: v.name,
                author: v.author,
                avatar: v.avatar,
                description: v.description,
                status: v.status,
                updatedAt: v.updatedAt,
                github: v.github
            }))
            return v
        }
    }
}
</script>

<style lang="stylus" scoped>
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
</style>
