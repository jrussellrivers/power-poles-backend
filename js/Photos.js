const Photos = () => {

    const grabAllPhotos = async (db, user_inspection_id) => {
        return await db.any(`SELECT form_id,record_id,file_name FROM s3_photos WHERE record_id='${user_inspection_id}'`)
    }
    
    const grabSinglePhoto = async (db, name) => {
        return await db.one(`SELECT * FROM s3_photos WHERE file_name='${name}'`);
    }
    
    return {
        grabAllPhotos,
        grabSinglePhoto
    }
}

module.exports = Photos