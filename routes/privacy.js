var express = require('express')
var router = express.Router()

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
      console.log('Site DATA: ' + JSON.stringify(siteData))
      req.siteData = siteData.items
      next()
    })
    .catch(console.error)
})

router.use((req, res, next) => {
  page
    .getPageData('privacy')
    .then(pageData => {
      console.log('PAGE DATA: ' + JSON.stringify(pageData))
      req.pageData = pageData.items
      next()
    })
    .catch(console.error)
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('privacy', {
    title: 'privacy',
    header: 'light',
    md: md,
    pageData: req.pageData,
    siteData: req.siteData
  })
})

module.exports = router
