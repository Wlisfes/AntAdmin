/*
 * @Author: 情雨随风 
 * @Date: 2019-05-11 13:20:38 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-11 13:21:49
 */


import Ant from 'ant-design-vue';
import * as Api  from './Api/Api'
import 'ant-design-vue/dist/antd.css'
import './assets/style/common.css'

export default class {
    constructor(Vue) {
        this.Vue = Vue
    }

    init() {
        const Vue = this.Vue

        Vue.config.productionTip = false
        Vue.prototype.Api = Api
        Vue.use(Ant)
    }
}