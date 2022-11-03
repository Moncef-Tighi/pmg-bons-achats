import mysql from "mysql2"

const pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password : process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 50,
    queueLimit: 0,
});

if (pool) console.log("connexion à la base de donnée réussie");
const db = pool.promise();
export default db