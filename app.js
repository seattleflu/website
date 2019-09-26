var createError = require('http-errors')
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

const production = process.env.NODE_ENV === "production";

var app = express()

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
app.use('/thank-you/:thankyouid', thankyouRouter)
app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// app.use(function (req, res, next) {
//   res.status(404).send("Sorry can't find that!")
// })

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'production' ? err : {}
  res.status(404).render('404', { title: '404', header: 'light' })
  // render the error page
  res.status(err.status || 500)
  console.error(err.message);
  
  res.render('404', { title: 'Page Not Found', header: 'light' })
})

module.exports = app
