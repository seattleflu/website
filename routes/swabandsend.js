var express = require('express')
var router = express.Router()

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
    .getPageData('swabandsend')
    .then(pageData => {
      req.pageData = pageData.items
      next()
    })
    .catch(console.error)
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('swabandsend', {
    title: 'Swab and Send',
    header: 'dark',
    md: md,
    nav: 'true',
    enroll: 'false',
    logos: 'false',
    pageData: req.pageData,
    siteData: req.siteData
  })
})

module.exports = router
