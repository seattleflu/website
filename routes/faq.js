var express = require('express')
var router = express.Router()
var faq = require('../services/faq')

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
    .getPageData('faq')
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
    .getFaq()
    .then(faqData => {
      req.faqData = faqData.items
      next()
    })
    .catch(console.error)
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('faq', {
    title: 'Seattle Flu Study FAQ',
    faqData: req.faqData,
    pageData: req.pageData,
    siteData: req.siteData,
    header: 'light',
    nav: req.nav,
    enroll: req.enroll,
    logos: 'true',
    md: md
  })
})

module.exports = router
