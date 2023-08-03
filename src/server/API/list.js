let db = require('../db/index')

exports.all = (req, res) => {        //获取dog表全部数据
    var sql = 'select * from dog'
    db.query(sql, (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}
exports.get = (req, res) => {        //通过id查询数据
    var sql = 'select * from dog where id = ?'    //？用于占位
    db.query(sql, [req.query.id], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}

exports.del = (req, res) => {        //通过id删除数据
    var sql = 'delete from dog where id = ?'
    db.query(sql, [req.query.id], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}

exports.add = (req, res) => {        //向info表添加数据
    var sql = 'insert into dog (id,sex,clor,age) values (?,?,?,?)'
    db.query(sql, [req.query.id, req.query.name, req.query.address, req.query.tel], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}

exports.update = (req, res) => {        //通过id更新数据
    var sql = 'update info set sex = ?, clor = ?, age = ? where id = ?'
    db.query(sql, [req.query.name, req.query.address, req.query.tel, req.query.id], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}
