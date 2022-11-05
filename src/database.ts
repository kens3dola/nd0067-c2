import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const { POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB_TEST, ENV } = process.env;

console.log("Environment: ", ENV);
let client: Pool;
if (ENV === "test") {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB_TEST,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}

if (ENV === "dev") {
    client = new Pool({
        host: POSTGRES_HOST,
        database: POSTGRES_DB,
        user: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
    });
}

const executeQuery = async (sql: string, param: any[]): Promise<any[]> => {
    try {
        const conn = await client.connect();
        const result = await conn.query(sql, param);
        console.log(`Query: ${sql}\nParams: ${param}}`);
        conn.release();
        return result.rows;
    } catch (err) {
        throw new Error(`unable to execute query: ${client}\n${err}`);
    }
};

export default executeQuery;
