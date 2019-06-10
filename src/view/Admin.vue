/*
 * @Author: Parker 
 * @Date: 2019-05-05 11:24:52 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-05 22:02:27
 * @Types 后台首页
 */


<template>
    <a-layout id="Admin">
        <Sider :collapsed='collapsed'
                @ispoint="iSpoint">
        </Sider>
        <a-layout>
            <Header :collapsed='collapsed'
                    @iscoll="iScoll">
            </Header>
            <a-layout-content class="Content" :style="{ paddingLeft: getWidth }">
                <div class="Content-View">
                    <router-view/>
                </div>
            </a-layout-content>
            <Footer></Footer>
        </a-layout>
    </a-layout>
</template>

<script>
import Sider from '../components/Admin/Sider'
import Header from '../components/Admin/Header'
import Footer from '../components/Admin/Footer'
export default {
    data() {
        return {
            collapsed: false,
        }
    },
    computed: {
        getWidth() {
            return this.collapsed ? "80px" : "200px"
        }
    },
    methods: {
        iScoll(coll) {
            this.collapsed = coll
        },
        iSpoint(coll) {
            this.collapsed = coll
        }
    },
    components: {
        Sider,
        Header,
        Footer
    }
}
</script>

<style lang="stylus" scoped>
#Admin {
    .Content {
        padding-left 200px
        transition padding .2s
        display flex
        flex-direction column
        box-sizing border-box
        padding-top 64px
        overflow-x auto
        .Content-View {
            min-height 100%
            min-width 1164px
            margin 0 24px
            display flex
            flex-direction column
        }
    }
}

</style>
