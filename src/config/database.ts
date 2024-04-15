import mysql2 from "mysql2/promise";

export const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'blog',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    port: 3306
}) 