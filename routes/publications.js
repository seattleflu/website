var express = require ('express');
var router = express.Router ();
var research = require ('../services/research');
var page = require ('../services/page');
var site = require ('../services/site');
var category = require('../services/researchcategory');

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
    .getPageData ('publications')
    .then (pageData => {
      req.pageData = pageData.items;
      console.log(pageData.items)
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
  research
    .getResearch ()
    .then (researchData => {
      req.researchData = researchData.items;
      console.log(researchData.items)
      next ();
    })
    .catch (console.error);
});

router.use ((req, res, next) => {
  category
    .getResearchCat ()
    .then (researchCatData => {
      req.researchCatData = researchCatData.items;
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
  res.render ('publications', {
    title: 'Seattle Flu Study - publications',
    header: 'light',
    nav: req.nav,
    enroll: req.enroll,
    logos: 'true',
    md: md,
    pageData: req.pageData,
    siteData: req.siteData,
    researchData: req.researchData,
    researchCatData: req.researchCatData,
    pageUrl: req.pageUrl
  });
});

module.exports = router;
