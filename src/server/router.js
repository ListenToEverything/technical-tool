let express = require('express')
let router = express.Router()
let student = require('./API/student')
let list = require('./API/list')
let dog = require('./API/dog')


router.get('/student', student.select)
router.get('/dog', dog.selectAll)




router.get('/list/all', list.all)
router.get('/list/get', list.get)
router.get('/list/add', list.add)
router.get('/list/update', list.update)
router.get('/list/del', list.del)


module.exports = router
