/*
 * @Author: 情雨随风
 * @Date: 2019-06-15 21:05:25
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-15 22:01:02
 * @Description: 工具函数
 */


export const timeFix = () => {
    const time = new Date()
    const hour = time.getHours()
    return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 18 ? '下午好' : '晚上好'
}

export const welcome = () => {
    const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DNF', '我猜你可能累了']
    const index = Math.floor(Math.random() * arr.length)
    return arr[index]
}



