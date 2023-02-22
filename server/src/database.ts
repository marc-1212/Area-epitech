const mysql = require('mysql2/promise');
const config = require('./config/db.config');

async function Connect(): Promise<void> {
    return await mysql.createConnection({
        config
    });
}

async function Query(sql: String, params: any[]) {
    const connection = await mysql.createConnection(config.db);
    const [results, ] = await connection.execute(sql, params);

    return results;
}

export { Connect, Query };