const Inspections = () => {

    const grabALLInspections = async (db) => {
        return await db.one(`SELECT id FROM inspections`)
    }

    const grabInspection = async (db, id) => {
        let result = await db.oneOrNone(`SELECT * FROM inspections WHERE id='${id}'`)
        return result
    }

    const createInspection = async (db, id, code, name) => {
        // check if exists
        return await db.none(`INSERT into inspections (id, code, name) VALUES ('${id}', '${code}','${name}')`)
    }
    
    const editInspection = async (db, prev_id, new_id, code, name) => {
        return await db.none(`UPDATE inspections SET id='${new_id}', code='${code}', name='${name}' WHERE id=${prev_id}`);
    }
    
    return {
        grabALLInspections,
        grabInspection,
        createInspection,
        editInspection
    }
}

module.exports = Inspections