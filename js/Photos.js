const Photos = () => {

    const grabAllPhotos = async (db, user_inspection_id, name) => {
        return await db.any(`SELECT * FROM s3_photos WHERE record_id='${user_inspection_id}' AND file_name LIKE '%${name}%' LIMIT 100`)
    }
    
    return {
        grabAllPhotos
    }
}

module.exports = Photos