var express = require('express')
var router = express.Router()

var page = require('../services/page')
var site = require('../services/site')
var barcodeFaq = require('../services/barcodeFaq')
var resultsFaq = require('../services/resultsFaq')

router.use((req, res, next) => {
  site
    .getSiteData()
    .then(siteData => {
      console.log('Site DATA: ' + JSON.stringify(siteData))
      req.siteData = siteData.items
      next()
    })
    .catch(console.error)
})

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

router.use((req, res, next) => {
  resultsFaq
    .getResultsFaq()
    .then(resultsFaq => {
      req.resultsFaq = resultsFaq.items
      next()
    })
    .catch(console.error)
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('results', {
    title: 'Results Page',
    header: 'light',
    pageData: req.pageData,
    siteData: req.siteData
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

router.get('/faq', function (req, res, next) {
  res.render('resultsFaq', {
    title: 'Results FAQ',
    header: 'light',
    pageData: req.pageData,
    resultsFaq: req.resultsFaq
  })
})

module.exports = router
