const bcrypt = require("bcrypt");
const saltRounds = 10;
//logic to create a user
const createUser = async (req, res, next) => {
    db = res.db
    let hash = await bcrypt.hash(req.body.password, saltRounds)
    const searchRegExp = /'/g;
    const replaceWith = "''";
    const result = req.body.username.replace(searchRegExp, replaceWith)
    let insertion = await db.none(
        `INSERT INTO users (username, password) VALUES ($1, $2)`,
        [result, hash]
    );

    next()
};

module.exports = createUser