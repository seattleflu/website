var express = require ('express');
var router = express.Router ();
var home = require ('../services/index');
var page = require ('../services/page');
var site = require ('../services/site');

var md = require ('markdown-it') ({
  html: true,
});
var markdownItAttrs = require ('markdown-it-attrs');

md.use(markdownItAttrs, {
  // optional, these are default options
  leftDelimiter: '{',
  rightDelimiter: '}',
  allowedAttributes: [] // empty array = all attributes are allowed
})

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
    .getPageData ('/')
    .then (pageData => {
      req.pageData = pageData.items;
      if (pageData.items[0].fields.showMenu != null) {
        var nav = pageData.items[0].fields.showMenu;
        req.nav = nav.toString ();
      } else {
        req.nav = 'true';
      }

      if (pageData.items[0].fields.showJoinTheStudyAfterMenu != null) {
        var enroll = pageData.items[0].fields.showJoinTheStudyAfterMenu;
        req.enroll = enroll.toString ();
      } else {
        req.enroll = 'true';
      }

      next ();
    })
    .catch (console.error);
});

router.use ((req, res, next) => {
  home
    .getHome ()
    .then (homeData => {
      req.homeData = homeData.items;
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



/* GET home page. */
router.get ('/', function (req, res, next) {
  res.render ('index', {
    title: 'Seattle Flu Study',
    header: 'dark',
    nav: req.nav,
    enroll: req.enroll,
    logos: 'true',
    md: md,
    pageData: req.pageData,
    siteData: req.siteData,
    homeData: req.homeData,
    pageUrl: req.pageUrl
  });
});

module.exports = router;
