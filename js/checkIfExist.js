//checks if user aleady exists
const checkIfExist = async (req, res, next) => {
  db = res.db
  const searchRegExp = /'/g;
  const replaceWith = "''";
  const result = req.body.username.replace(searchRegExp, replaceWith)
  let user_status = await db.oneOrNone(
    `SELECT * FROM users WHERE username='${result}'`
  );
  user_status != null ? res.send(`User Already Exists`) : next();
};

module.exports = checkIfExist