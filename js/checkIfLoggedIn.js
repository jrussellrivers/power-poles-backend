const checkIfLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) return next()
};

module.exports = checkIfLoggedIn