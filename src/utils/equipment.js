/*
 * @Author: xueml
 * @Date: 2023-08-02 11:22:58
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-02 13:55:33
 * @FilePath: \technical-tool\src\utils\equipment.js
 */
// eslint-disable-next-line
const equipment = {
    // 判断当前设备是否是手机
    isMobile () {
        const flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
        return flag
    },
    ipInfo () {
        return {
            userAgent: navigator.userAgent,
            appName: navigator.appName,
            appCodeName: navigator.appCodeName,
            appVersion: navigator.appVersion,
            appMinorVersion: navigator.appMinorVersion,
            platform: navigator.platform,
            cookieEnabled: navigator.cookieEnabled,
            onLine: navigator.onLine,
            userLanguage: navigator.language,
            // mimeTypes.description: navigator.mimeTypes[1].description,
            // mimeTypes.type: navigator.mimeTypes[1].type,
            // plugins.description: navigator.plugins[3].description,

            ip: returnCitySN.cip,
            areaCode: returnCitySN.cid, // 地区代码
            location: returnCitySN.cname// 所在地
        }
    }
}

export default equipment
