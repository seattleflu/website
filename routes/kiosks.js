var express = require('express')
var router = express.Router()
var kiosks = require('../services/kiosks')

var page = require('../services/page')

router.use((req, res, next) => {
  page
    .getPageData('kiosks')
    .then(pageData => {
      console.log('PAGE DATA: ' + JSON.stringify(pageData))
      req.pageData = pageData.items
      next()
    })
    .catch(console.error)
})

router.use((req, res, next) => {
  kiosks
    .getKiosks()
    .then(kiosksData => {
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
    kiosksData: req.kiosksData,
    pageData: req.pageData
  })
})

module.exports = router
