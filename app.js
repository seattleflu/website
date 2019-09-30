var createError = require ('http-errors');
var express = require ('express');
var path = require ('path');
var cookieParser = require ('cookie-parser');
var logger = require ('morgan');

var indexRouter = require ('./routes/index');
var faqRouter = require ('./routes/faq');
var scienceRouter = require ('./routes/science');
var currentRouter = require ('./routes/current');
var enrollRouter = require ('./routes/enroll');
var schoolsRouter = require ('./routes/schools');
var resultsRouter = require ('./routes/results');
var thankyouRouter = require ('./routes/thankyou');
var privacyRouter = require ('./routes/privacy');
var kiosksRouter = require ('./routes/kiosks');
var learnmoreRouter = require ('./routes/learnmore');
var householdsRouter = require ('./routes/households');
var mediaRouter = require ('./routes/media');
var errorRouter = require ('./routes/error');

var app = express ();

// view engine setup
app.set ('views', path.join (__dirname, 'views'));
app.set ('view engine', 'ejs');

app.use (logger ('dev'));
app.use (express.json ());
app.use (express.urlencoded ({extended: false}));
app.use (cookieParser ());
app.use (express.static (path.join (__dirname, 'science/dist/js')));
app.use (express.static (path.join (__dirname, 'current/dist/js')));
app.use (express.static (path.join (__dirname, 'results/dist/js')));
app.use (express.static (path.join (__dirname, 'enroll/dist/js')));
app.use (express.static (path.join (__dirname, 'enroll/dist/css')));
app.use (express.static (path.join (__dirname, 'public')));

app.use ('/', indexRouter);
app.use ('/science', scienceRouter);
app.use ('/science/map', scienceRouter);
app.use ('/science/tree', scienceRouter);
app.use ('/current', currentRouter);
app.use ('/faq', faqRouter);
app.use ('/enroll', enrollRouter);
app.use ('/schools', schoolsRouter);
app.use ('/results', resultsRouter);
app.use ('/privacy', privacyRouter);
app.use ('/kiosks', kiosksRouter);
app.use ('/learnmore', learnmoreRouter);
app.use ('/households', householdsRouter);
app.use ('/media-inquiries', mediaRouter);

app.use ('/thank-you/:thankyouid', thankyouRouter);
app.use ('*', errorRouter);

// app.use('/thank-you', thankyouRouter)

// catch 404 and forward to error handler
app.use (function (req, res, next) {
  next (createError (404));
});

// app.use(function (req, res, next) {
//   res.status(404).send("Sorry can't find that!")
// })

// error handler
app.use (function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get ('env') === 'development' ? err : {};

  res.status (404).render ('404', {title: '404', header: 'light'});
  // render the error page
  res.status (err.status || 500);
  console.error (err.message);
});

module.exports = app;
