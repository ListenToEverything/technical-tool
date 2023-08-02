/*
 * @Author: xueml
 * @Date: 2023-08-02 11:22:58
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-02 16:26:40
 * @FilePath: \technical-tool\src\utils\timeConversion.js
 */
//  秒值转时分秒
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
