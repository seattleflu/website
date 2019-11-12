var express = require('express')
var router = express.Router()
const JSON = require('circular-json')
var resource = require('../services/resource')
var md = require('markdown-it')({
  html: true
})
var markdownItAttrs = require('markdown-it-attrs')



/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('resource', {
    title: 'Resource',
    header: 'light',
    md: md,
    logos: 'true'
  })
})

module.exports = router
