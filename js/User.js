const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = () => {

    const checkIfExist = async (db, username) => {
        const searchRegExp = /'/g;
        const replaceWith = "''";
        const result = username.replace(searchRegExp, replaceWith)
        let user_status = await db.oneOrNone(
          `SELECT * FROM users WHERE username='${result}'`
        );
        return user_status
    };

    const createUser = async (db, username, password, inspection_id, admin) => {
        let hash = await bcrypt.hash(password, saltRounds)
        const searchRegExp = /'/g;
        const replaceWith = "''";
        const result = username.replace(searchRegExp, replaceWith)
        let insertion = await db.none(
            `INSERT INTO users (username, password, inspection_id, admin) VALUES ($1, $2, $3, $4)`,
            [result, hash, inspection_id, admin]
        );
    }
    
    const grabUser = async (db, username) => {
        let result = await db.oneOrNone(`SELECT * FROM users WHERE username='${username}'`)
        return result
    }

    const editUser = async (db, user_id, username, password, inspection_id, admin) => {
        const searchRegExp = /'/g;
        const replaceWith = "''";
        const result = username.replace(searchRegExp, replaceWith)
        if (password === false){
            await db.none(`UPDATE users SET username='${result}', inspection_id='${inspection_id}' WHERE id=${user_id}`);
            return true
        } else {
            let hash = await bcrypt.hash(password, saltRounds)
            await db.none(`UPDATE users SET username='${result}', password='${hash}', inspection_id='${inspection_id}' WHERE id=${user_id}`);    
            return true
        }
    };

    const grabAllUsers = async (db) => {
        let result = await db.any('SELECT * FROM users')
        return result
    }
    
    return {
        checkIfExist,
        createUser,
        grabUser,
        editUser,
        grabAllUsers
    }
}

module.exports = User