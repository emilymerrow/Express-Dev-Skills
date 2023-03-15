const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override');
const indexRouter = require('./routes/index');
const skillsRouter = require('./routes/skills');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(function(req, res, next){
  console.log('middleware function is running');

  next()

  // if(req.query._method === 'DELETE' || req.query._method === 'PUT'){
  //   req.method = req.query._method // DElete or PUt
  // }
  // call next to pass the req object to the next middleware function 
  // app.use(logger('dev'))
})

app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// sets up the router object on the app
// we can put each router, an adress 
app.use('/', indexRouter);

// /users says the router (userRouter) and the routes inside of it 
// are prepended with /users, starts with /users and then whatever is in the userRouter
app.use('/skills', skillsRouter);




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

module.exports = app;
