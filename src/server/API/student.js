let db = require('../db/index')

exports.select = (req, res) => {
    var sql = 'select * from student'
    db.query(sql, [req.query.name, req.query.password], (err, data) => {
        if(err) {
            return res.send('错误：' + err.message)
        }
        res.send(data)
    })
}
