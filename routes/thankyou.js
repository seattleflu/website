var express = require('express')
var router = express.Router()
var thankyou = require('../services/thankyou')
const JSON = require('circular-json')
var page = require('../services/page')

router.use((req, res, next) => {
  page
    .getPageData('thank-you')
    .then(pageData => {
      console.log('PAGE DATA: ' + JSON.stringify(pageData))
      req.pageData = pageData.items
      next()
    })
    .catch(console.error)
})

// router.use(function (req, res, next) {
//   thankyou.getThankyou().then(function (thankyouData) {
//     console.log('PAGE DATA: ' + JSON.stringify(thankyouData))
//     req.thankyouData = thankyouData
//     next()
//   })
// })

router.use((req, res, next) => {
  let requestSegments = req.baseUrl.split('/')
  console.log(requestSegments)
  var thankyouUrl = requestSegments[2]

  thankyou
    .getThankyou(thankyouUrl)
    .then(thankyouData => {
      console.log('PAGE DATA: ' + JSON.stringify(thankyouData))
      req.thankyouData = thankyouData.items[0]
      next()
    })
    .catch(console.error)
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('thankyou', {
    title: 'Thank You',
    thankyouData: req.thankyouData,
    pageData: req.pageData,
    header: 'light'
  })
})

module.exports = router
