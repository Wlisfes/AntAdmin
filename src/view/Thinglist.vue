/*
 * @Author: Parker 
 * @Date: 2019-05-05 16:22:13 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-05 17:13:41
 * @Types 项目管理>项目列表界面
 */

<template>
    <div id="Thin">
        
        <div style="margin: 0 24px;">
            <p v-for="k in 100" v-html="k" :key="k"></p>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="stylus" scoped>
#Thin {
    margin 0 -24px
}
</style>


