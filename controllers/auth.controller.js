var mongoose = require('mongoose'),
    jwt = require('jsonwebtoken'),
    User = mongoose.model('User')
    config = require('../Config'),
    passport = require('passport'),
    GooglePlusTokenStrategy = require('passport-google-plus-token');
    

module.exports.login =  function(req, res, next) {
  //  console.log(req.user);
    const token = jwt.sign({data:req.user},config.SECRET,{expiresIn: '24h'})    
    res.status(200).json({ token });
    }

passport.use('googleToken',new GooglePlusTokenStrategy({
    clientID: config.google.clientID,
    clientSecret: config.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
    try {
        User.findOne({
             "googleId": profile.id 
          }).exec(function(err, existingUser) {
            if (err) {
              return next(err);
            }
            if (existingUser) {
                return done(null, existingUser);
            }
            else{
                const user ={
                    googleId: profile.id,
                    email: profile.emails[0].value,
                    firstname:profile.name.givenName,
                    lastname:profile.name.familyName,
                    notes:[] 
                };                
                User.create(user, function(err, newUser) {
                    if (err) {
                      return next(err);
                    }
                    return done(null, newUser);
                  });
            }

        });
    } catch(error) {
        done(error, false, error.message);
    }
    }));