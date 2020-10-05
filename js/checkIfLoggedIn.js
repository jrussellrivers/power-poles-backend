const checkIfLoggedIn = (req, res) => {
    if(req.isAuthenticated()) return next()
    return res.redirect('/login')
};

module.exports = checkIfLoggedIn