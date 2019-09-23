var express = require('express')
var router = express.Router()

var page = require('../services/page')

router.use((req, res, next) => {
  page
    .getPageData('science')
    .then(pageData => {
      console.log('PAGE DATA: ' + JSON.stringify(pageData))
      req.pageData = pageData.items
      next()
    })
    .catch(console.error)
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('science', {
    title: 'Science',
    header: 'light',
    pageData: req.pageData
  })
})

router.get('/map', function (req, res, next) {
  res.render('map', {
    title: 'Science page map',
    header: 'light',
    pageData: req.pageData
  })
})

router.get('/tree', function (req, res, next) {
  res.render('tree', {
    title: 'Science page tree',
    header: 'light',
    pageData: req.pageData
  })
})

module.exports = router
