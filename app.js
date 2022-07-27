var express = require ('express');

var path = require ('path');
var cookieParser = require ('cookie-parser');
var logger = require ('morgan');

var indexRouter = require ('./routes/index');
var faqRouter = require ('./routes/faq');
var dataRouter = require ('./routes/data-updates');
var scienceRouter = require ('./routes/science');
var currentRouter = require ('./routes/current');
var enrollRouter = require ('./routes/enroll');
var schoolsRouter = require ('./routes/schools');
var resultsRouter = require ('./routes/results');
var thankyouRouter = require ('./routes/thankyou');
var privacyRouter = require ('./routes/privacy');
var kiosksRouter = require ('./routes/kiosks');
var learnmoreRouter = require ('./routes/learnmore');
var tySSSTRouter = require ('./routes/thank-you-ss-st');
var swabandsendRouter = require ('./routes/swabandsend');
var householdsRouter = require ('./routes/households');
var welcomeRouter = require ('./routes/welcome');
var uwRouter = require ('./routes/uw');
var symptomsRouter = require ('./routes/symptoms-survey');
var immunityRouter = require ('./routes/immunity');
var webmdRouter = require ('./routes/webmd');
var infoRouter = require ('./routes/info');
var contactRouter = require ('./routes/contactus');
var aboutRouter = require ('./routes/about');
var historyRouter = require ('./routes/history');
var historyScandashboardsRouter = require ('./routes/historyScandashboards');
var mediaRouter = require ('./routes/media');
var errorRouter = require ('./routes/error');
var ssecRouter = require ('./routes/ssec');
var ssccRouter = require ('./routes/sscc');
var asecRouter = require ('./routes/asec');
var asccRouter = require ('./routes/ascc');
var stecRouter = require ('./routes/stec');
var stccRouter = require ('./routes/stcc');
var scanRouter = require ('./routes/scan');
var adsRouter = require ('./routes/ads');
var resourceRouter = require ('./routes/resource');
var resourcesRouter = require ('./routes/resources');
var updatesRouter = require ('./routes/updates');
var appleRouter = require('./routes/apple');
var appleFaqRouter = require('./routes/applestudyfaq');
var applePdfRouter = require('./routes/apple-pdf');
var researchRouter = require ('./routes/research');
var publicationsRouter = require ('./routes/publications');
var pathogensRouter = require ('./routes/pathogens');

const production = process.env.NODE_ENV === 'production';

var app = express ();

// In production, trust Heroku as a reverse proxy and Express will use request
// metadata from the proxy.
if (production) app.enable ('trust proxy');

// Force HTTPS
app.use (require ('heroku-ssl-redirect') ());

// Remove www. from domain
app.use (require ('express-naked-redirect') ({reverse: true})); // remove www.

// Send files using a compressed content-encoding if possible
app.use (require ('compression') ());

// Webpack hot reloading in development.  This works in tandem with the Webpack
// development config.
if (!production) {
  const webpack = require ('webpack');
  const devMiddleware = require ('webpack-dev-middleware');
  const hotMiddleware = require ('webpack-hot-middleware');
  const config = require ('./webpack.config');
  const compiler = webpack (config ('development'));

  app.use ('/dist', devMiddleware (compiler, {publicPath: '/'}));
  app.use (hotMiddleware (compiler));
}

// view engine setup
app.set ('views', path.join (__dirname, 'views'));
app.set ('view engine', 'ejs');

var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'stg') {
  app.use(function (req, res, next) {
    if ('/robots.txt' === req.url) {
      res.type('text/plain');
      res.send('User-agent: *\nDisallow: /');
    } else {
      next();
    }
  });
}

app.use (logger ('dev'));
app.use (express.json ());
app.use (express.urlencoded ({extended: false}));
app.use (cookieParser ());
app.use ('/dist', express.static (path.join (__dirname, 'dist')));
app.use (express.static (path.join (__dirname, 'public')));

app.use('/', indexRouter);

// app.use('/science', scienceRouter)
// app.use('/current', currentRouter)
app.use('/faq', faqRouter)
app.use('/data-updates', dataRouter)
// app.use('/enroll', enrollRouter)
// app.use('/schools', schoolsRouter)
app.use('/results', resultsRouter)
app.use ('/privacy', privacyRouter);
// app.use('/kiosks', kiosksRouter)
// app.use('/learnmore', learnmoreRouter);
// app.use('/thank-you-ss-st', tySSSTRouter);
app.use ('/households', householdsRouter);
app.use ('/welcome', welcomeRouter);
app.use ('/research', researchRouter);
app.use ('/publications', publicationsRouter);
app.use ('/pathogens', pathogensRouter);

app.use ('/uw/start', function (req, res) {
  res.redirect (302, 'https://backoffice.seattleflu.org/husky-musher');
});

app.use ('/scanpublichealth', function (req, res) {
  res.redirect (302, 'https://scanpublichealth.org/');
});

app.use ('/uw', uwRouter);
app.use ('/symptoms-survey', symptomsRouter);
app.use ('/airs', immunityRouter);
// app.use('/webmd', webmdRouter);
// app.use('/info', infoRouter);
// app.use('/media-inquiries', mediaRouter);
// app.use('/swabandsend', swabandsendRouter);
app.use ('/contact-us', contactRouter);
app.use ('/about', aboutRouter);
app.use ('/history', historyRouter);
app.use ('/history/scandashboards', historyScandashboardsRouter);
// app.use('/ssec', ssecRouter);
// app.use('/sscc', ssccRouter);
// app.use('/asec', asecRouter);
// app.use('/ascc', asccRouter);
// app.use('/stec', stecRouter);
// app.use('/stcc', stccRouter);
// app.use('/scan', scanRouter);
// app.use('/a/:ad', adsRouter)
// app.use('/resources/:resource', resourceRouter)
app.use('/resources', resourcesRouter);
// app.use('/updates', updatesRouter);

app.use('/applerespiratorystudy', appleRouter);
app.use('/applerespiratorystudy/support/watch', applePdfRouter);
app.use('/applerespiratorystudy/support', appleFaqRouter);
app.use ('/apple', function (req, res) {
  res.redirect (302, '/applerespiratorystudy');
});
app.use('/:thankyouid', thankyouRouter)

// app.use ('/', function (req, res) {
//   res.redirect (302, '/welcome');
// });

app.use(errorRouter);





module.exports = app;
