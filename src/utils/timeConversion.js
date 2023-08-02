/*
 * @Author: xueml
 * @Date: 2023-08-02 11:22:58
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-02 14:05:24
 * @FilePath: \technical-tool\src\utils\timeConversion.js
 */
/**
 * @author lyq
 * @time 2021年11月21日21:08:48
 *
 * 秒值转时分秒
 * @name TimeToString
 * @example 秒值转时分秒
 * @param {String} seconds 秒
 */
const TimeToString = (seconds) => {
    const param = parseInt(seconds)
    const hh = ''
    let mm = ''
    let ss = ''
    if (param >= 0 && param < 60) {
        param < 10 ? (ss = '0' + param) : (ss = param)
        return '00:' + ss
    } else if (param >= 60 && param < 3600) {
        mm = parseInt(param / 60)
        mm < 10 ? (mm = '0' + mm) : mm
        param - parseInt(mm * 60) < 10
            ? (ss = '0' + String(param - parseInt(mm * 60)))
            : (ss = param - parseInt(mm * 60))
        return mm + ':' + ss
    }
}
export default {
    TimeToString
}
