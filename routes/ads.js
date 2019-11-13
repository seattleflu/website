var express = require('express')
var router = express.Router()
var page = require('../services/page')
var site = require('../services/site')
var ads = require('../services/ads')
const JSON = require('circular-json')
var md = require('markdown-it')({
  html: true
})
var markdownItAttrs = require('markdown-it-attrs')


router.use((req, res, next) => {
  site
    .getSiteData()
    .then(siteData => {
      req.siteData = siteData.items
      next()
    })
    .catch(console.error)
})

router.get('/', function(req, res, next){
    let requestSegments = req.baseUrl.split('/')
    var adsUrl = requestSegments[2]
  ads
    .getAds(adsUrl)
    .then(pageData => {
      req.pageData = pageData.items
      console.log(JSON.stringify(pageData))
      next()
    })
    .catch(console.error)
})


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('ads', {
    title: 'ads',
    pageData: req.pageData,
    siteData: req.siteData,
    header: 'light',
    logos: 'true',
    nav: 'true',
    enroll: 'true',
    md: md
  })
})

module.exports = router
