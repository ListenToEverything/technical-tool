/*
 * @Author: xueml
 * @Date: 2023-08-02 11:22:58
 * @LastEditors: Do not edit
 * @LastEditTime: 2023-08-02 16:22:42
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

            souhuip: returnCitySN.cip,
            areaCode: returnCitySN.cid, // 地区代码
            location: returnCitySN.cname,// 所在地
            // QQIP: "你的IP是：" + IPData[0] + "，来自：" + IPData[2]

        }
    },
    getIP () {
        var xhr = new XMLHttpRequest()
        xhr.open('GET', 'https://api.ipify.org?format=json', true)
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText)
                var ip = response.ip
                console.log('这说的就是 ', response)
                // 在这里可以对获取到的IP地址进行处理
            }
        }
        xhr.send()
        return ip
    }
}


export default equipment
