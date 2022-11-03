import db from "../db.js";


export const insertionBon = async (numero_bon, valeur, type, date_expiration=null)=> {

    const etat = type==="bonAchat" ? "Non-Soldé" : "Valide"
    const sql = "INSERT INTO bon (numero_bon, valeur, type, date_expiration, etat) VALUES (?, ?, ?,?, ?)"
    const [rows] = await db.query(sql, [numero_bon, valeur, type, date_expiration, etat])
    console.log(rows);
    return rows;
}