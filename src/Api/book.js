/*
 * @Author: 情雨随风
 * @Date: 2019-06-12 22:35:56
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-21 23:44:44
 * @Description: 笔记操作接口
 */


import http from '@/lib/http'


//新增笔记
export const SubmitBookFn = props => {
    return http.post(props, `/post/book`)
}


//获取笔记列表
export const getBookListFn = props => {
    return http.get(props, `/all/book`)
}


//开放笔记
export const OpenBookFn = props => {
    return http.get(props, `/open/book`)
}


//关闭笔记
export const DownBookFn = props => {
    return http.get(props, `/down/book`)
}


//删除笔记
export const DelBookFn = props => {
    return http.get(props, `/del/book`)
}


//条件查找
export const FindWhereBookFn = props => {
    return http.post(props, `/find/book`)
}


//修改笔记
export const UpdateBook = props => {
    return http.post(props, `/update/book`)
}


//获取用户对应的笔记
export const UidBook = props => {
    return http.get(props, `/uid/book`)
}
