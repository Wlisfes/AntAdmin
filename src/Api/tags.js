/*
 * @Author: 情雨随风
 * @Date: 2019-06-07 00:15:17
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-07 00:20:04
 * @Description: 标签操作接口
 */


import http from '@/lib/http'


//新增标签
export const SubmitTagsFN = props => {
    return http.post(props, `/post/tags`)
}


//获取全部标签列表
export const getTagsListFN = props => {
    return http.get(props, `/all/tags`)
}


//获取已开放的标签列表
export const getTagsOpenListFN = props => {
    return http.get(props, `/all/open/tags`)
}
