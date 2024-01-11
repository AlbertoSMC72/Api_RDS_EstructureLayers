import dotenv from 'dotenv'
import { createConnection } from 'mysql2';
dotenv.config();

const db = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST
}

const config = createConnection(db);

export default config.promise();