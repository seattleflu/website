var express = require('express')
var router = express.Router()
var kiosks = require('../services/kiosks')

var page = require('../services/page')

var md = require('markdown-it')({
  html: true
})
var markdownItAttrs = require('markdown-it-attrs')
var site = require('../services/site')

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
    .getPageData('kiosks')
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
  kiosks
    .getKiosks()
    .then(kiosksData => {
      req.kiosksData = kiosksData.items
      next()
    })
    .catch(console.error)
})

router.get('/', function(req,res,next){
  var baseUrl = req.get('host')
  var pageUrl = req.baseUrl;
  req.pageUrl =  baseUrl + pageUrl
  next()
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('kiosks', {
    title: 'Kiosks',
    header: 'light',
    nav: req.nav,
    enroll: req.enroll,
    logos: 'true',
    md: md,
    kiosksData: req.kiosksData,
    pageData: req.pageData,
    siteData: req.siteData,
    pageUrl:req.pageUrl
  })
})

module.exports = router
