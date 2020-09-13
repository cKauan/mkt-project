const express = require('express');
const nunjucks = require('nunjucks');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const dotenv = require('dotenv');
const methodOverride = require('method-override');
const passport = require('passport');
const cookieSession = require('cookie-session');
const app = express();
dotenv.config();

require('./controllers/passport-auth');
const URL = process.env.MONGODB_URI;
mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

requireDir('./models')

app.use(cookieSession({
    name: 'user-auth',
    keys: ['key', 'key2']
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'njk');
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./controllers/routes'));

nunjucks.configure('src/views', {
    express: app,
    autoescape: false,
    noCache: true
})

app.listen(process.env.PORT || 3333);