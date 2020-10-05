const findPolePicture = async (db, req, res, next) => {
    let result = await db.manyOrNone(
      `SELECT * FROM s3_photos Where file_name LIKE ‘%${req.body.fileName}%’ AND form_id=‘${req.body.formId}’`
    );
    res.send(result)
};

module.exports = findPolePicture