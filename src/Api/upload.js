/*
 * @Author: 情雨随风
 * @Date: 2019-06-13 22:03:32
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-13 22:25:53
 * @Description: 上传图片
 */


import http from '@/lib/http'

export default (props, url) => {
    return http.upload(props, url)
}