const express = require('express');
const app = express();
const ejs = require('ejs');
const cookieSession = require('cookie-session');
const passport = require('passport')
const userRoute = require('./routes/user');
const googleSetup = require('./utils/googlepassport');
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(cookieSession({
    maxAge: 24*60*60*1000,
    keys: ['thisismagiccode']
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', userRoute);
app.listen(process.env.PORT || 3000,()=>{
    console.log('server started at 3000 prt');
})
