import db from "../db.js";


export const insertionBon = async (numero_bon, valeur, type, date_expiration=null)=> {

    const sql = "INSERT INTO bon (numero_bon, valeur, type, date_expiration) VALUES (?, ?, ?,?)"
    const [rows] = await db.query(sql, [numero_bon, valeur, type, date_expiration])
    console.log(rows);
    return rows;
}