var express = require ('express');
var router = express.Router ();

var page = require ('../services/page');
var site = require ('../services/site');

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
      next ();
    })
    .catch (console.error);
});

/* GET home page. */
router.get ('/', function (req, res, next) {
  res.render ('enroll', {
    title: 'Enroll Page',
    header: 'light',
    nav: 'false',
    enroll: 'false',
    logos: 'true',
    pageData: req.pageData,
    siteData: req.siteData,
  });
});

module.exports = router;
