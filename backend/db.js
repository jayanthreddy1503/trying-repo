// ============================================================
// 4.e Connection between the API and the Database
// using the mysql2 driver, plus running database/init.sql so
// the schema is guaranteed to exist before the API serves data.
// ============================================================
const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
require("dotenv").config();

// A connection pool is more robust than a single connection for
// a live API, since it reuses connections across requests.
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  multipleStatements: true, // needed to run the init.sql file in one go
  waitForConnections: true,
  connectionLimit: 10,
});

async function initDatabase() {
  const initSqlPath = path.join(__dirname, "database", "init.sql");
  const initSql = fs.readFileSync(initSqlPath, "utf8");

  const connection = await pool.getConnection();
  try {
    await connection.query(initSql);
    console.log("Database initialized from database/init.sql");
  } finally {
    connection.release();
  }
}

// After init, all app queries should target the wardrobe_manager DB.
const appPool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "wardrobe_manager",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = { initDatabase, appPool };
