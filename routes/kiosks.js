var express = require('express')
var router = express.Router()

/* GET kiosks page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Seattle Flustudy Kiosks' })
})

module.exports = router
