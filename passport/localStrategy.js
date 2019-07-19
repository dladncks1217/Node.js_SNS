const LocalStrategy = require('passport-local').Strategy;
const {User} = require('../models');

module.exports = (passport)=>{
    passport.use(new LocalStrategy({
        usernameField: 'email', //req.body.email
        passwordField: 'password', //req.body.password

    }, async (email, password, done)=>{
        try{
            const 
        }catch(error){

        }
    }));
};