/*
 * @Author: 情雨随风 
 * @Date: 2019-05-11 13:20:38 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-14 22:19:47
 */


import Ant from 'ant-design-vue';
import Api  from './Api'
import * as Aux from './lib/Auxli'
import 'ant-design-vue/dist/antd.css'
import './assets/style/common.css'

export default {
    install(Vue) {
        Vue.config.productionTip = false
        Vue.prototype.Api = Api
        Vue.prototype.Aux = Aux
        Vue.use(Ant)
    }
}