//checks if user aleady exists
const checkIfExist = async (db, username) => {
  const searchRegExp = /'/g;
  const replaceWith = "''";
  const result = username.replace(searchRegExp, replaceWith)
  let user_status = await db.oneOrNone(
    `SELECT * FROM users WHERE username='${result}'`
  );
  return user_status
};

module.exports = checkIfExist