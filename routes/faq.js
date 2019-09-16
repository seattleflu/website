var express = require('express')
var router = express.Router()
var faq = require('../services/faq')

router.use((req, res, next) => {
  faq
    .getFaq()
    .then(faqData => {
      console.log('PAGE DATA: ' + JSON.stringify(faqData))
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
    header: 'light'
  })
})

module.exports = router
