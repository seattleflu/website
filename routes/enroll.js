var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('enroll', { title: 'Enroll Page', header: 'light' })
})

module.exports = router
