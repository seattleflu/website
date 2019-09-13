var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('kiosks', { title: 'Kiosks', header: 'light' })
})

module.exports = router
