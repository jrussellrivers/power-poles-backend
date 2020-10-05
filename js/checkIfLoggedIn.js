const checkIfLoggedIn = (req, res) => {
    if(req.isAuthenticated()) return next()
};

module.exports = checkIfLoggedIn