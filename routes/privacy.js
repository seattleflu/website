var express = require('express')
var router = express.Router()

var page = require('../services/page')
var md = require('markdown-it')({
  html: true
})
var markdownItAttrs = require('markdown-it-attrs')

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
    pageData: req.pageData
  })
})

module.exports = router
