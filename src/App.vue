/*
 * @Author: Parker 
 * @Date: 2019-05-05 11:32:21 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-05 13:20:47
 * @types App组件
 */


<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
#app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}
</style>
