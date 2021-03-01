var express = require('express')
var router = express.Router()
var faq = require('../services/applestudyfaq')
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
    .getPageData('applerespiratorystudy/support')
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
  faq
    .getAppleFaq()
    .then(faqData => {
      req.faqData = faqData.items
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
  res.render('applestudyfaq', {
    title: 'Apple Respiratory Study FAQ',
    header: 'dark',
    faqData: req.faqData,
    pageData: req.pageData,
    siteData: req.siteData,
    nav: req.nav,
    enroll: req.enroll,
    logos: 'false',
    md: md,
    pageUrl:req.pageUrl
  })
})

module.exports = router
