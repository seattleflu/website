var express = require('express')
var router = express.Router()

var page = require('../services/page')

router.use((req, res, next) => {
  page
    .getPageData('/')
    .then(pageData => {
      console.log('PAGE DATA: ' + JSON.stringify(pageData))
      req.pageData = pageData.items
      next()
    })
    .catch(console.error)
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Seattle Flu Study',
    header: 'dark',
    pageData: req.pageData
  })
})

module.exports = router
