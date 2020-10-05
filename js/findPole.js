const findPole = async (db, req, res, next) => {
    let result = await db.manyOrNone(
      `SELECT * FROM poles Where file_name LIKE ‘%${req.body.fileName}%’ AND form_id=‘${req.body.formId}’`
    );
    res.send(result)
};

module.exports = findPole