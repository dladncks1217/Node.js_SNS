const LocalStrategy = require('passport-local').Strategy;

module.exports = (passport)=>{
    passport.use(new LocalStrategy({
        usernameField: 'email', //req.body.email
        passwordField: 'password', //req.body.password

    }, async (email, password, done)=>{

    }));
};