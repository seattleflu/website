var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('thankyou', { title: 'Thank You' })
})

module.exports = router
