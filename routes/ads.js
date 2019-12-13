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
      if(pageData.items[0].fields.showMenu != null){
        var nav = pageData.items[0].fields.showMenu
        req.nav = nav.toString();
      }else{
        req.nav = 'true'
      }
      if(pageData.items[0].fields.showJoinTheStudyAfterMenu != null){
        var enroll = pageData.items[0].fields.showJoinTheStudyAfterMenu
        req.enroll = enroll.toString();
        console.log(req.enroll)
      }else{
        req.enroll = 'true'
      }
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
  res.render('ads', {
    title: 'ads',
    pageData: req.pageData,
    siteData: req.siteData,
    header: 'light',
    logos: 'true',
    nav: req.nav,
    enroll: req.enroll,
    md: md,
    pageUrl:req.pageUrl
  })
})

module.exports = router
