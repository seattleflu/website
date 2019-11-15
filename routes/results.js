var express = require('express')
var router = express.Router()

var page = require('../services/page')
var site = require('../services/site')
var barcodeFaq = require('../services/barcodeFaq')

router.use((req, res, next) => {
  site
    .getSiteData()
    .then(siteData => {
      req.siteData = siteData.items
      next()
    })
    .catch(console.error)
})

router.use((req, res, next) => {
  page
    .getPageData('results')
    .then(pageData => {
      req.pageData = pageData.items
      if(pageData.items[0].fields.showMenu != null){
        var nav = pageData.items[0].fields.showMenu
        req.nav = nav.toString();
      }else{
        req.nav = 'true'
      }
      if(pageData.items[0].fields.showJoinTheStudyAfterMenu != null){
        var enroll = pageData.items[0].fields.showJoinTheStudyAfterMenu
        req.enroll = enroll.toString();
      }else{
        req.enroll = 'true'
      }
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
    title: 'Your Results (coming soon!)',
    header: 'light',
    nav: req.nav,
    enroll: req.enroll,
    logos: 'true',
    pageData: req.pageData,
    siteData: req.siteData
  })
})

router.get('/barcode-faq', function (req, res, next) {
  res.render('barcodeFaq', {
    title: 'Barcode FAQ',
    header: 'light',
    nav: req.nav,
    enroll: req.enroll,
    logos: 'true',
    pageData: req.pageData,
    siteData: req.siteData,
    barcodeFaq: req.barcodeFaq
  })
})

module.exports = router
