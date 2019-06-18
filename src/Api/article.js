/*
 * @Author: 情雨随风
 * @Date: 2019-06-19 00:00:45
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-19 00:22:33
 * @Description: 文章操作接口
 */


import http from '@/lib/http'


//新增文章
export const SubmitArticleFn = props => {
    return http.post(props, `/post/article`)
}



