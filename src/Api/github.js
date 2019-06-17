/*
 * @Author: 情雨随风
 * @Date: 2019-06-16 11:31:15
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-17 23:42:52
 * @Description: github相关
 */

import http from '@/lib/http'
const baseUrl = `https://api.github.com`

//获取github仓库commits记录
export const Commits = props => {
    return http.get(props, `${baseUrl}/repos/Wlisfes/AntAdmin/commits`)
}


//新增友链
export const postGitHubFn = props => {
    return http.post(props, `/post/github`)
}


//获取友链列表
export const getGitHubListFn = props => {
    return http.get(props, `/all/github`)
}



//开放友链
export const OpenGitHubFn = props => {
    return http.get(props, `/open/github`)
}


//关闭友链
export const DownGitHubFn = props => {
    return http.get(props, `/down/github`)
}


//删除友链
export const DelGitHubFn = props => {
    return http.get(props, `/del/github`)
}


//跟新友链信息
export const UpdateGitHubFn = props => {
    return http.post(props, `/update/github`)
}


//条件查询
export const FindGitHubFn = props => {
    return http.post(props, `/find/github`)
}
