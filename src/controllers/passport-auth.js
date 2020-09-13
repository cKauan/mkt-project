const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Cookies
passport.serializeUser((user, done) => {
    done(null, user)
})
passport.deserializeUser((user, done) => {
    done(null, user)
})
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3333/login/callback"
}, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
}
));