module.exports = {
    isLogged(req, res, next) {
        if (req.user) {
            return next();
        }
        res.render('login.njk')
    }
}
