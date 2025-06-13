import mysql from "mysql2/promise";
import dotenv from "dotenv";
 
dotenv.config();

// TODO
// Create the pool to connect to the database
// Use the database settings from the .env file
// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // <-- Add this line
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
});

export async function getArticles() {
  const [rows] = await pool.query("SELECT * FROM articles");
  return rows;
}


export { pool };
