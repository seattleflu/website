var express = require('express')
var router = express.Router()

var page = require('../services/page')
var site = require('../services/site')

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
    .getPageData('science')
    .then(pageData => {
      console.log('PAGE DATA: ' + JSON.stringify(pageData))
      req.pageData = pageData.items
      next()
    })
    .catch(console.error)
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('science', {
    title: 'Science',
    header: 'light',
    nav: 'true',
    enroll: 'false',
    logos: 'true',
    pageData: req.pageData,
    siteData: req.siteData
  })
})

router.get('/map', function (req, res, next) {
  res.render('map', {
    title: 'Science page map',
    header: 'light',
    nav: 'true',
    enroll: 'false',
    logos: 'true',
    pageData: req.pageData,
    siteData: req.siteData
  })
})

router.get('/tree', function (req, res, next) {
  res.render('tree', {
    title: 'Science page tree',
    header: 'light',
    nav: 'true',
    enroll: 'false',
    logos: 'true',
    pageData: req.pageData,
    siteData: req.siteData
  })
})

module.exports = router
