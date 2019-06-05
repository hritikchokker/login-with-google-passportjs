const express = require('express');
const passport = require('passport');
const routes = express.Router();
const User = require('../db/models/userschema');
routes.get('/google',passport.authenticate('google',{scope:['profile','email']}));
 
routes.get('/dashboard',passport.authenticate('google'),(req,res)=>{
    console.log('request is HRITIK',req.user.username ,req.user.picture);
    res.render('dashboard',{
        name:req.user.username,
        image:req.user.picture ,
        email:req.user.email});
    // res.send('welcome user' + req.user.username);
})

 module.exports = routes;



//this will give a error because user will have all the info
//userObject.name


// user.findOne({
//     googleId: profile.id
// }).then(currentUser => {
//     if (currentUser) {
//         console.log('user exist');
//         done(null, currentUser); // call serialize
//     } else {
//         var userObject = new User({
//             googleId: profile.id,
//             pic: profile._json.image.url,
//             email: profile._json.email[0].value
//         });
//         userObject.save().then(newUser => {
//             console.log('new user added');
//             done(null, newUser);
//         })
//     }
// })