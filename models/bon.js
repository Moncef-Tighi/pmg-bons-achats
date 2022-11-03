import db from "../db.js";


export const insertionBon = async (numero_bon, valeur, type, date_expiration=null)=> {

    // const today = new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ');
    const etat = type==="bonAchat" ? "Non-Soldé" : "Valide"
    const sql = `INSERT INTO bon (numero_bon, valeur, type, date_expiration, etat, date_ajout) 
    VALUES (?, ?, ?,?, ?,SYSDATE()) `
    const [rows] = await db.query(sql, [numero_bon, valeur, type, date_expiration, etat])
    return rows;
}

export const listeBon = async(page=1)=> {

    const pageSize=5
    let realPage = page
    const sql = `
        SELECT * FROM bon
        ORDER BY date_ajout DESC
        limit ${pageSize}
        offset ${(realPage-1)* pageSize}
    `
    const [rows] = await db.query(sql)
    const [total] = await db.query("SELECT COUNT(*) FROM bon;")
    return {rows, total}
}