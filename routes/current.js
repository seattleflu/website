var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('current', { title: 'Current Conditions', header: 'light' })
})
module.exports = router
