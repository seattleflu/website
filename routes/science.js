var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Science page' })
})

router.get('/map', function (req, res, next) {
  res.render('index', { title: 'Science page map' })
})

router.get('/tree', function (req, res, next) {
  res.render('index', { title: 'Science page tree' })
})

module.exports = router
