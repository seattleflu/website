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
        req.nav = 'true'
      }
      next ();
    })
    .catch (console.error);
});

/* GET home page. */
router.get ('/', function (req, res, next) {
  res.render ('enroll', {
    title: 'Enroll Page',
    header: 'light',
    nav: req.nav,
    enroll: req.enroll,
    logos: 'true',
    pageData: req.pageData,
    siteData: req.siteData,
  });
});

module.exports = router;
