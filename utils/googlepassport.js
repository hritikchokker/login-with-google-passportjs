const GoogleStrategy = require('passport-google-oauth2');
const passport = require('passport');
const connection = require('../db/connection');
const User = require('../db/models/userschema');
//serialize will call when u write a cookie
passport.serializeUser((user,done)=>{
    var error = null;
    done(error,user);
});
//to read a token no. form a cookie
//this will call when u read a data from cookie same as above
passport.deserializeUser((userid,done)=>{
    console.log('user session', userid);
    //added after
    User.findById(userid).then(user=>{
        done(null,user);
    })
})
passport.use(new GoogleStrategy({
    callbackURL:'/dashboard',
    clientID: 'your client id generated at cloud.console.google.com',
    clientSecret: 'your secret key can be found on google cloud console'
},(accessToken,refreshToken, profile, done)=>{
    console.log('callback google...',profile,"token",accessToken);
    
    User.findOne({ googleId: profile.id}).then(currentUser => {
        if (currentUser) {
            console.log('user exist');
            done(null, currentUser); // call serialize
        } else {
            var userObject = new User({
                googleId: profile.id,
                username:profile._json.name,
                picture: profile._json.picture,
                email: profile._json.email
            });
            userObject.save().then(newUser => {
                console.log('new user added');
                done(null, newUser);
            });
        }
    });

}));


    // var userObject = {
    //     googleId: profile.id,
    //     username: profile._json.name,
    //     picture: profile._json.picture,
    //     email: profile._json.email
    // };
    // //profile in done passed
    // done(null, userObject);
