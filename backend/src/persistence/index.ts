import mysqlDriver from "./mysql.js";
import sqliteDriver from "./sqlite.js";
import { DatabaseDriver } from "./types.js";

let db: DatabaseDriver;

if (process.env.MYSQL_HOST && process.env.NODE_ENV !== "test") {
  db = mysqlDriver;
} else {
  db = sqliteDriver;
}

export default db;
