var express = require('express')
var router = express.Router()
var thankyou = require('../services/thankyou')
const JSON = require('circular-json')
var page = require('../services/page')
var site = require('../services/site')
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

router.use((req, res, next) => {
  page
    .getPageData('thank-you')
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

// router.use(function (req, res, next) {
//   thankyou.getThankyou().then(function (thankyouData) {
//     req.thankyouData = thankyouData
//     next()
//   }
// })

router.use((req, res, next) => {
  let requestSegments = req.baseUrl.split('/')
  var thankyouUrl = requestSegments[1]

  thankyou
    .getThankyou(thankyouUrl)
    .then(thankyouData => {

      req.thankyouData = thankyouData.items[0]
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
  res.render('thankyou', {
    title: 'Thank You',
    thankyouData: req.thankyouData,
    pageData: req.pageData,
    siteData: req.siteData,
    header: 'dark',
    nav: req.nav,
    md: md,
    enroll: req.enroll,
    logos: 'true',
    pageUrl:req.pageUrl
  })
})

module.exports = router
