var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('privacy', { title: 'privacy', header: 'dark' })
})

module.exports = router
