let mysql = require('mysql')

let db = mysql.createPool({
    host: '127.0.0.1',     //数据库IP地址
    user: 'root',          //数据库登录账号
    password: 'xml5478',      //数据库登录密码
    database: 'demo',       //要操作的数据库
    port:3306,
})

module.exports = db