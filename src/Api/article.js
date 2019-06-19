/*
 * @Author: 情雨随风
 * @Date: 2019-06-19 00:00:45
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-20 00:01:47
 * @Description: 文章操作接口
 */


import http from '@/lib/http'


//新增文章
export const SubmitArticleFn = props => {
    return http.post(props, `/post/article`)
}


//获取文章列表
export const getArticleListFn = props => {
    return http.get(props, `/all/article`)
}


//开放文章
export const OpenArticleFn = props => {
    return http.get(props, `/open/article`)
}


//关闭文章
export const DownArticleFn = props => {
    return http.get(props, `/down/article`)
}


//删除文章
export const DelArticleFn = props => {
    return http.get(props, `/del/article`)
}


//修改文章
export const UpdateArticle = props => {
    return http.post(props, `/update/article`)
}


