/*
 * @Author: 情雨随风
 * @Date: 2019-06-06 23:40:27
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-06 23:57:42
 * @Description: 项目操作接口
 */


import http from '@/lib/http'


//新增项目
export const SubmitTaskeFN = props => {
    return http.post(props, `/post/taske`)
}


//获取项目列表
export const getTaskeListFN = props => {
    return http.get(props, `/all/taske`)
}

