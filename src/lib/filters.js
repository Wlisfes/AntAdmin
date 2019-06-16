/*
 * @Date: 2019-06-11 09:54:00
 * @Author: 情雨随风
 * @LastEditors: 情雨随风
 * @LastEditTime: 2019-06-16 15:48:19
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

export const adminText = admin => {
    return admin == 'admin' ? '超级管理员' :
           admin = 'same' ? '测试管理员' : '游客账户'
}


export const Time = date => {
    let t = date.slice(0, date.indexOf('T'))
    let m = date.slice(date.indexOf('T') + 1, date.length - 1)
    return t + ' ' + m
}

export const Ftime = v => {
    let t = v.slice(0,v.indexOf('T'))
    let m = v.slice(v.indexOf('T') + 1,v.indexOf('.'))
    var strtime = `${t} ${m}`;
    var date = new Date(strtime.replace(/-/g, '/'))
    var timespan = date.getTime() / 1000
    var dateTime = new Date(timespan * 1000);
    var year = dateTime.getFullYear();
    //当前时间
    var now = Date.parse(new Date());  //typescript转换写法
    var milliseconds = 0;
    var timeSpanStr;
    //计算时间差
    milliseconds = (now / 1000) - timespan;

    //一分钟以内
    if (milliseconds <= 60) {
        timeSpanStr = '刚刚';
    }
    //大于一分钟小于一小时
    else if (60 < milliseconds && milliseconds <= 60 * 60) {
        timeSpanStr = Math.ceil((milliseconds / (60))) + '分钟前';
    }
    //大于一小时小于等于一天
    else if (60 * 60 < milliseconds && milliseconds <= 60 * 60 * 24) {
        timeSpanStr = Math.ceil(milliseconds / (60 * 60)) + '小时前';
    }
    //大于一天小于等于15天
    else if (60 * 60 * 24 < milliseconds && milliseconds <= 60 * 60 * 24 * 30) {
        timeSpanStr = Math.ceil(milliseconds / (60 * 60 * 24)) + '天前';
    }
    //大于一个月小于一年
    else if (60 * 60 * 24 * 30 < milliseconds && milliseconds <= 60 * 60 * 24 * 30 * 12){
        timeSpanStr = Math.ceil(milliseconds / (60 * 60 * 24 * 30)) + '个月前';
    }
    //超过一年显示
    else {
        timeSpanStr = new Date().getFullYear() - year + '年前'
    }
    return timeSpanStr;
}