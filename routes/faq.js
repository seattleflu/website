var express = require('express')
var router = express.Router()
var faq = require('../services/faq')

var page = require('../services/page')

router.use((req, res, next) => {
  page
    .getPageData('faq')
    .then(pageData => {
      console.log('PAGE DATA: ' + JSON.stringify(pageData))
      req.pageData = pageData.items
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
    header: 'light'
  })
})

module.exports = router
