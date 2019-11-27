var express = require('express')
var router = express.Router()

var page = require('../services/page')
var site = require('../services/site')

var createError = require('http-errors')

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
    .getPageData('error')
    .then(pageData => {
      req.pageData = pageData.items
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
router.get('/', function(req,res,next){
  var baseUrl = req.get('host')
  var pageUrl = req.baseUrl;
  req.pageUrl =  baseUrl + pageUrl
  next()
})

router.use(
  (req, res, next) => {
    // catch 404 and forward to error handler below
    next(createError(404))
  },
  (err, req, res, next) => {
    console.error(err);
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    // render the error page
    res.status(err.status || 500)
    res.render('error', {
      title: 'Error',
      header: 'light',
      nav: req.nav,
      enroll: req.enroll,
      logos: 'false',
      md,
      pageData: req.pageData,
      siteData: req.siteData,
      pageUrl:req.pageUrl
    })
  }
)

module.exports = router
