/*
 * @Author: 情雨随风 
 * @Date: 2019-05-10 23:10:00 
 * @Last Modified by: Parker
 * @Last Modified time: 2019-05-14 22:02:25
 * @Types 辅助工具函数
 */


import Cookies from 'js-cookie'
import crypto from 'crypto'
import { TOKEN_KEY,CRYPTO_KEY } from './cofn'



//是否登录状态
export const isToken = () => {
    const token = Cookies.get(TOKEN_KEY)
    return token ? true : false
}

//获取Token
export const getStore = () => {
    const token = Cookies.get(TOKEN_KEY)
    if(token) {
        return JSON.parse(token)//JSON.parse(aesDecrypt(token, CRYPTO_KEY))
    }  
    else {
        return null
    }
        
}

//储存Token
export const setStore = token => {
    // let v = aesEncrypt(typeof token === 'string' ? token : JSON.stringify(token), CRYPTO_KEY)
    Cookies.set(TOKEN_KEY, JSON.stringify(token), { expires: 1 })
}

//删除Token
export const removesetStore = () => {
    Cookies.remove(TOKEN_KEY)
    return false
}

/**
 * 加密方法
 * @param { String } data
 * @param { String } key
 */
export const aesEncrypt = (data, key) => {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

/**
 * 解密方法
 * @param { String } data
 * @param { String } key
 */
export const aesDecrypt = (data, key) => {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(data, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}