var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var faqRouter = require('./routes/faq')
var scienceRouter = require('./routes/science')
var currentRouter = require('./routes/current')
var enrollRouter = require('./routes/enroll')
var schoolsRouter = require('./routes/schools')
var resultsRouter = require('./routes/results')
var thankyouRouter = require('./routes/thankyou')
var privacyRouter = require('./routes/privacy')
var kiosksRouter = require('./routes/kiosks')
var learnmoreRouter = require('./routes/learnmore');
var swabandsendRouter = require ('./routes/swabandsend');
var householdsRouter = require('./routes/households');
var webmdRouter = require('./routes/webmd');
var contactRouter = require('./routes/contactus');
var mediaRouter = require('./routes/media');
var errorRouter = require('./routes/error')
var ssecRouter = require('./routes/ssec')

const production = process.env.NODE_ENV === "production";

var app = express()

// In production, trust Heroku as a reverse proxy and Express will use request
// metadata from the proxy.
if (production)
  app.enable("trust proxy");

// Force HTTPS
app.use(require("heroku-ssl-redirect")());

// Remove www. from domain
app.use(require("express-naked-redirect")({reverse: true})); // remove www.

// Send files using a compressed content-encoding if possible
app.use(require("compression")());

// Webpack hot reloading in development.  This works in tandem with the Webpack
// development config.
if (!production) {
  const webpack = require("webpack");
  const devMiddleware = require("webpack-dev-middleware");
  const hotMiddleware = require("webpack-hot-middleware");
  const config = require("./webpack.config");
  const compiler = webpack(config("development"));

  app.use('/dist', devMiddleware(compiler, {publicPath: "/"}));
  app.use(hotMiddleware(compiler));
}

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/dist', express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/science', scienceRouter)
app.use('/current', currentRouter)
app.use('/faq', faqRouter)
app.use('/enroll', enrollRouter)
app.use('/schools', schoolsRouter)
app.use('/results', resultsRouter)
app.use('/privacy', privacyRouter)
app.use('/kiosks', kiosksRouter)
app.use('/learnmore', learnmoreRouter);
app.use('/households', householdsRouter);
app.use('/webmd', webmdRouter);
app.use('/media-inquiries', mediaRouter);
app.use('/swabandsend', swabandsendRouter);
app.use('/contact-us', contactRouter);
app.use('/ssec', ssecRouter);
app.use('/thank-you/:thankyouid', thankyouRouter)
app.use('/', indexRouter)
app.use(errorRouter);


module.exports = app
