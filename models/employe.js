import db from "../db.js";

export const allEmploye = async function(param="", permissions="") {

    // const sql = `SELECT employee.id_employe,email, nom, prenom, poste, active,
    // array_agg(nom_role) as "permissions" FROM "employee"
    // LEFT JOIN "permissions" ON "employee".id_employe = permissions.id_employe
    // LEFT JOIN "roles" ON permissions.id_role = roles.id_role
    // ${query.where(param)}
    // GROUP BY employee.id_employe,email, nom, prenom, poste,active
    // ${permissions ? permissions : ""}
    // ${query.sort(param)}
    // ${query.paginate(param)}`;

    // const values = query.sanitize();
    // const response = await db.query(sql, values);

    // return response.rows;

}

export const oneEmploye = async function(id) {
    const sql = `SELECT id_employe,email, admin, password FROM employe WHERE id_employe = ? 
    `;
    const [rows] = await db.query(sql, id)
    console.log(rows);
    return rows;

}

export const findEmployeId = async function(email) {
    // const sql = ` SELECT id_employe FROM employee WHERE email= $1 `
    // const values = [email];
    // const response = await db.query(sql, values)
    // return response.rows[0];
}

export const findEmploye = async function(id) {
    // const sql = ` SELECT id_employe FROM employee WHERE id_employe= $1 `
    // const values = [id];
    // const response = await db.query(sql, values)
    // return response.rows[0];
}

export const employeLogin = async function(email) {
    const sql = `SELECT id_employe email, password, admin FROM employe WHERE email = ?
    `
    const [rows] = await db.query(sql, email)
    console.log(rows);
    return rows;
}

export const newEmploye = async function(email, password, admin=false){
    const sql = `
    INSERT INTO employe(email, password, admin)
    VALUES 
    (?, ?, ? )
    `
    const [rows] = await db.query(sql, [email, password, admin])
    console.log(rows);
    return rows;
}

export const changeEmploye = async function(id,email,nom,prenom="",poste="", active=true){


    // const sql = `
    // UPDATE employee 
    // SET email=$2, nom=$3, prenom=$4, poste=$5, active=$6
    // WHERE id_employe=$1
    // RETURNING *
    // `
    // const values = [id,email, nom, prenom, poste, active];
    // const response = await db.query(sql, values)
    // return response.rows[0];

}

export const changeSelfEmploye = async function(id,email,nom,prenom=""){

    
    // const sql = `
    // UPDATE employee 
    // SET email=$2, nom=$3, prenom=$4
    // WHERE id_employe=$1
    // RETURNING *
    // `
    // const values = [id,email, nom, prenom];
    // const response = await db.query(sql, values)
    // return response.rows[0];

}


export const changePassword = async function(id, password) {
    // const sql = `UPDATE employee SET password= $2 WHERE id_employe=$1`;
    // const values = [id, password];
    // const response = await db.query(sql, values)
    // return response.rows[0];

}