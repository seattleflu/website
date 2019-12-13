var express = require ('express');
var router = express.Router ();

var page = require ('../services/page');
var site = require ('../services/site');
var md = require('markdown-it')({
  html: true
})
var markdownItAttrs = require('markdown-it-attrs')

router.use ((req, res, next) => {
  site
    .getSiteData ()
    .then (siteData => {
      req.siteData = siteData.items;
      next ();
    })
    .catch (console.error);
});

router.use ((req, res, next) => {
  page
    .getPageData ('enroll')
    .then (pageData => {
      req.pageData = pageData.items;
      if(pageData.items[0].fields.showMenu != null){
        var nav = pageData.items[0].fields.showMenu
        req.nav = nav.toString();
      }else{
        req.enroll = 'true'
      }
      if(pageData.items[0].fields.showJoinTheStudyAfterMenu != null){
        var enroll = pageData.items[0].fields.showJoinTheStudyAfterMenu
        req.enroll = enroll.toString();
      }else{
        req.nav = 'true'
      }
      next ();
    })
    .catch (console.error);
});

router.get('/', function(req,res,next){
  var baseUrl = req.get('host')
  var pageUrl = req.baseUrl;
  req.pageUrl =  baseUrl + pageUrl
  next()
})

router.get('/', function(req,res,next){
  var ua = req.get('User-Agent');
  console.log(ua)
  var msie = ua.indexOf('MSIE'); // IE 10 or older
  var trident = ua.indexOf('Trident/'); //IE 11
  
  if(msie > 0 || trident > 0){
       req.ie = true
    }else{
      req.ie = false
    }

  next()
})

/* GET home page. */
router.get ('/', function (req, res, next) {
  res.render ('enroll', {
    ie:req.ie,
    title: 'Enroll Page',
    header: 'light',
    nav: req.nav,
    enroll: req.enroll,
    logos: 'true',
    pageData: req.pageData,
    siteData: req.siteData,
    pageUrl:req.pageUrl,
     md: md
  });
});

module.exports = router;
