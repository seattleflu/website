var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('science', { title: 'Science', header: 'light' })
})

router.get('/map', function (req, res, next) {
  res.render('map', { title: 'Science page map', header: 'light' })
})

router.get('/tree', function (req, res, next) {
  res.render('tree', { title: 'Science page tree', header: 'light' })
})

module.exports = router
