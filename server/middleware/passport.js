const JwtStrategy = require('passport-jwt').Strategy;
const ExractJwt = require('passport-jwt').ExtractJwt;
const keys = require('../config/keys');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const options = {
    jwtFromRequest: ExractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwtKey
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await User.findById(payload.userId).select('login id');

                if (user) {
                    done(null, user)
                } else {
                    done(null, false);
                }
            } catch (e) {
                console.log(`Error ${e}`);
            }
        })
    )
};