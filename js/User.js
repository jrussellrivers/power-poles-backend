const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = () => {

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
    
    const editUser = async (db, user_id, username, password, inspection_id, admin) => {
        let hash = await bcrypt.hash(password, saltRounds)
        const searchRegExp = /'/g;
        const replaceWith = "''";
        const result = username.replace(searchRegExp, replaceWith)
        let insertion = await db.none(`UPDATE users SET username='${result}', password='${hash}', inspection_id='${inspection_id}', admin='${admin}' WHERE id=${user_id}`);
    };
    
    return {
        createUser,
        editUser
    }
}

module.exports = User