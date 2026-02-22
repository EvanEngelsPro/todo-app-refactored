import mysqlDriver from './mysql';
import sqliteDriver from './sqlite';
import { DatabaseDriver } from './types';

let db: DatabaseDriver;

if (process.env.MYSQL_HOST && process.env.NODE_ENV !== 'test') {
    db = mysqlDriver;
} else {
    db = sqliteDriver;
}

export default db;
