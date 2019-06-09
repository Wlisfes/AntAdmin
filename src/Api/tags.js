/*
 * @Author: 情雨随风
 * @Date: 2019-06-07 00:15:17
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-09 14:04:56
 * @Description: 标签操作接口
 */


import http from '@/lib/http'


//新增标签
export const SubmitTagsFn = props => {
    return http.post(props, `/post/tags`)
}


//获取全部标签列表
export const getTagsListFn = props => {
    return http.get(props, `/all/tags`)
}


//获取已开放的标签列表
export const getTagsOpenListFn = props => {
    return http.get(props, `/all/open/tags`)
}


//开放标签
export const OpenTagsFn = props => {
    return http.get(props, `/open/tags`)
}


//关闭标签
export const DownTagsFn = props => {
    return http.get(props, `/down/tags`)
}


//删除标签
export const DelTagsFn = props => {
    return http.get(props, `/del/tags`)
}


//条件查找
export const FindWhereTagsFn = props => {
    return http.post(props, `/find/tags`)
}


//修改标签
export const UpdateTags = props => {
    return http.post(props, `/update/tags`)
}