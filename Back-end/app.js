var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function (username, password, done) {
    Account.findOne({ username: username })
      .then(function (user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(function (err) {
        return done(err)
      })
  })
)

require('dotenv').config();
const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connectionerror:'));
db.once("open", function () {
  console.log("Connection to DB succeeded")
});

async function recreateDB() {
  // Delete everything
  // await Vehicles.deleteMany();
  // let instance1 = new Vehicles({
  //   vehicle_type: "truck", color: 'purple',
  //   price: 1300
  // });
  // let instance2 = new Vehicles({
  //   vehicle_type: "car", color: 'white',
  //   price: 4000
  // })

  // let instance3 = new Vehicles({
  //   vehicle_type: "bike", color: 'black',
  //   price: 2000
  // })

  const newArray = [];
  Promise.all(newArray).then(doc => {
    console.log("First object saved")
  }
  ).catch(err => {
    console.error(err)
  });
}


let reseed = true;
if (reseed) { recreateDB(); }

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const userRoutes = require('./routes/userRoutes');

// const inventoryRoutes = require('./routes/inventoryRoutes');
const vendorRoutes = require('./routes/vendorRoutes');
// const orderRoutes = require('./routes/orderRoutes');
// const paymentRoutes = require('./routes/paymentRoutes');
// const ratingReviewRoutes = require('./routes/ratingReviewRoutes');
// const customerSupportRoutes = require('./routes/customerSupportRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
  
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', userRoutes);
app.use('/vendorapi',vendorRoutes);
// app.use('/api', inventoryRoutes);
// app.use('/api', vendorRoutes);
// app.use('/api', orderRoutes);
// app.use('/api', paymentRoutes);
// app.use('/api', ratingReviewRoutes);
// app.use('/api', customerSupportRoutes);

// passport config
// Use the existing connection
// The Account model
var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


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