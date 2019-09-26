var express = require('express')
var router = express.Router()

var page = require('../services/page')
var barcodeFaq = require('../services/barcodeFaq')

router.use((req, res, next) => {
  page
    .getPageData('results')
    .then(pageData => {
      console.log('PAGE DATA: ' + JSON.stringify(pageData))
      req.pageData = pageData.items
      next()
    })
    .catch(console.error)
})

router.use((req, res, next) => {
  barcodeFaq
    .getBarcodeFaq()
    .then(barcodeFaq => {
      req.barcodeFaq = barcodeFaq.items
      next()
    })
    .catch(console.error)
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('results', {
    title: 'Results Page',
    header: 'light',
    pageData: req.pageData
  })
})

router.get('/barcode-faq', function (req, res, next) {
  res.render('barcodeFaq', {
    title: 'Barcode FAQ',
    header: 'light',
    pageData: req.pageData,
    barcodeFaq: req.barcodeFaq
  })
})

module.exports = router
