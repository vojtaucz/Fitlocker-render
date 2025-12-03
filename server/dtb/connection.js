import mysql from 'mysql2/promise'
export async function connectiondtb() {
    const connection = await mysql.createConnection({
            host: 'localhost',
            port: 5050,
            user: 'root',
            password: 'root',
            database: 'fitlocker'
        });
        return connection;
}