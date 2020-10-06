const Inspections = () => {

    const createInspection = async (db, id, code, name) => {
        return await db.none(`INSERT into inspections (id, code, name) VAUES ('${id})', '${code}','${name}'`)
    }
    
    const editInspection = async (db, prev_id, new_id, code, name) => {
        return await db.none(`UPDATE inspections SET id='${new_id}', code='${code}', name='${name}' WHERE id=${prev_id}`);
    }
    
    return {
        createInspection,
        editInspection
    }
}

module.exports = Inspections