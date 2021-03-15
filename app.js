var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const candidateRouter = require('./routes/candidateRoute');
const hrmanagerRouter = require('./routes/hrmanagerRoute');
const interviewRouter = require('./routes/interviewRoute');

const sequelizeInit = require('./config/sequelize/init');
sequelizeInit()
    .catch(err => {
      console.log(err);
    });

var app = express();

const session = require('express-session');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));
app.use(express.static(path.join(__dirname, 'public')));

const i18n = require('i18n');
i18n.configure({
    locales: ['pl', 'en'],
    register:global,
    directory: path.join(__dirname, 'locales'),
    defaultLocale:"pl",
    objectNotation: true,
    cookie: 'tbhc-lang',
});
app.use((req, res, next) => {
    if(!res.locals.lang) {
        const currentLang = req.cookies['tbhc-lang'];
        res.locals.lang = currentLang;
    }
    next();
});

app.use(i18n.init);

app.use(session({
    secret: 'my_secret_password',
    resave: false
}));

app.use((req, res, next) => {
    const loggedUser = req.session.loggedUser;
    res.locals.loggedUser = loggedUser;
    if(!res.locals.loginError) {
        res.locals.loginError = undefined;
    }
    next();
});

const authUtils = require('./util/authUtils');

app.use('/', indexRouter);
app.use('/candidates', candidateRouter);
app.use('/hrmanagers', hrmanagerRouter);
app.use('/interviews',authUtils.permitAuthenticatedAllUser, interviewRouter);

const candidateApiRouter = require('./routes/api/CandidateApiRoute');
const hrManagerApiRouter = require('./routes/api/HrManagerApiRoute');
const interviewApiRouter = require('./routes/api/InterviewApiRoute');
app.use('/api/candidates', candidateApiRouter);
app.use('/api/hrmanagers', hrManagerApiRouter);
app.use('/api/interviews', interviewApiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
