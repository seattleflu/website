var express = require('express')
var router = express.Router()
var page = require('../services/page')
var site = require('../services/site')
var moment = require ('moment');

const JSON = require('circular-json')
var resource = require('../services/resource')
var md = require('markdown-it')({
  html: true
})

var markdownItAttrs = require('markdown-it-attrs')
md.use(markdownItAttrs, {
  // optional, these are default options
  leftDelimiter: '{',
  rightDelimiter: '}',
  allowedAttributes: []  // empty array = all attributes are allowed
});

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
    var resourceUrl = requestSegments[2]
  resource
    .getResource(resourceUrl)
    .then(pageData => {
      req.pageData = pageData.items
      // console.log(JSON.stringify(pageData.items[0].fields.additionalResources))
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


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('resource', {
    title: 'Resource',
    pageData: req.pageData,
    siteData: req.siteData,
    header: 'light',
    logos: 'true',
    nav: req.nav,
    enroll: req.enroll,
    md: md,
    moment: moment
  })
})

module.exports = router


