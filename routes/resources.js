var express = require('express')
var router = express.Router()

var page = require('../services/page')
var site = require('../services/site')
var resources = require('../services/resource')
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

router.use((req, res, next) => {
  page
    .getPageData('resources')
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

router.get('/', function(req, res, next){
  resources
    .getResources()
    .then(allResources => {
      req.allResources = allResources.items
      console.log(JSON.stringify(allResources))
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
  res.render('resources', {
    title: 'Resources',
    header: 'light',
    md: md,
    nav: req.nav,
    enroll: req.enroll,
    logos: 'true',
    pageData: req.pageData,
    siteData: req.siteData,
    allResources: req.allResources,
    pageUrl: req.pageUrl
  })
})

module.exports = router
