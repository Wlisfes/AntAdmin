/*
 * @Author: 情雨随风
 * @Date: 2019-06-16 11:31:15
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-16 11:35:11
 * @Description: github相关
 */

import http from '@/lib/http'
const baseUrl = `https://api.github.com`

//获取github仓库commits记录
export const Commits = props => {
    return http.get(props, `${baseUrl}/repos/Wlisfes/AntAdmin/commits`)
}
