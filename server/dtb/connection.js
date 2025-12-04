import mysql from 'mysql2/promise'
export async function connectiondtb() {
    const connection = await mysql.createConnection({
            host: 'fitlock-fitlock.e.aivencloud.com',
            port: 14747,
            user: 'avnadmin',
            password: 'AVNS_aQ39fAaD1E03EuslXo0',
            database: 'defaultdb'
        });
        return connection;
}
