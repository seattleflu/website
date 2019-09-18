var express = require('express')
var router = express.Router()
var kiosks = require('../services/kiosks')

router.use((req, res, next) => {
  kiosks
    .getKiosks()
    .then(kiosksData => {
      console.log('PAGE DATA: ' + JSON.stringify(kiosksData))
      req.kiosksData = kiosksData.items
      next()
    })
    .catch(console.error)
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('kiosks', {
    title: 'Kiosks',
    header: 'light',
    kiosksData: req.kiosksData
  })
})

module.exports = router
