/*
 * @Date: 2019-06-11 09:54:00
 * @Author: 情雨随风
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-11 10:03:42
 * @Description: Vue过滤器辅助函数
 */


export const statusType = status => {
    return status == 0 ? 'error' :
           status == 1 ? 'warning' :
           status == 2 ? 'success' : 'default'
}

export const statusText = status => {
    return status == 0 ? '已删除' :
           status == 1 ? '已关闭' :
           status == 2 ? '已发布' : '错误'
}