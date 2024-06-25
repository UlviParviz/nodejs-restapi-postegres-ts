import pg from "pg";
import { DB_CONNECTION_STRING } from "./env";



const postgresClient = new pg.Pool({
    connectionString:  DB_CONNECTION_STRING
})

export default postgresClient;