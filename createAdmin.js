const pgp = require("pg-promise")();
const secretInfo = require("./config.js")();
const db = pgp(secretInfo.connect)
const bcrypt = require("bcrypt");
const saltRounds = 10;

const createAdmin = async (username, password) =>{
    let hash = await bcrypt.hash(password, saltRounds)
    const searchRegExp = /'/g;
    const replaceWith = "''";
    const result = username.replace(searchRegExp, replaceWith)
    await db.none(
        `INSERT INTO users (username, password, admin) VALUES ($1, $2, $3)`,
        [result, hash, true]
    );
    return true
}

createAdmin('admin', 'admin')