/*
 * @Author: 情雨随风
 * @Date: 2019-06-06 23:40:27
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-10 23:40:34
 * @Description: 项目操作接口
 */


import http from '@/lib/http'


//新增项目
export const SubmitTaskeFn = props => {
    return http.post(props, `/post/taske`)
}


//获取项目列表
export const getTaskeListFn = props => {
    return http.get(props, `/all/taske`)
}


//开放项目
export const OpenTaskeFn = props => {
    return http.get(props, `/open/taske`)
}


//关闭项目
export const DownTaskeFn = props => {
    return http.get(props, `/down/taske`)
}


//删除项目
export const DelTaskeFn = props => {
    return http.get(props, `/del/taske`)
}


//条件查找
export const FindWhereTaskeFn = props => {
    return http.post(props, `/find/taske`)
}

