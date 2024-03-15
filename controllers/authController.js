const passport = require('passport');

exports.login = passport.authenticate('local', {
    successRedirect: '/login-success',
    failureRedirect: '/login-failure'
});

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};
