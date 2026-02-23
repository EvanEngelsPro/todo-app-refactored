import waitPort from "wait-port";
import fs from "fs";
import mysql from "mysql2";
import { DatabaseDriver, TodoItem, DatabaseTodoItem } from "./types.js";

const {
  MYSQL_HOST: HOST,
  MYSQL_HOST_FILE: HOST_FILE,
  MYSQL_USER: USER,
  MYSQL_USER_FILE: USER_FILE,
  MYSQL_PASSWORD: PASSWORD,
  MYSQL_PASSWORD_FILE: PASSWORD_FILE,
  MYSQL_DB: DB,
  MYSQL_DB_FILE: DB_FILE,
} = process.env;

let pool: mysql.Pool;

export async function init(): Promise<void> {
  const host = HOST_FILE ? fs.readFileSync(HOST_FILE, "utf-8").trim() : HOST;
  const user = USER_FILE ? fs.readFileSync(USER_FILE, "utf-8").trim() : USER;
  const password = PASSWORD_FILE
    ? fs.readFileSync(PASSWORD_FILE, "utf-8").trim()
    : PASSWORD;
  const database = DB_FILE ? fs.readFileSync(DB_FILE, "utf-8").trim() : DB;

  await waitPort({
    host,
    port: 3306,
    timeout: 10000,
    waitForDns: true,
  });

  pool = mysql.createPool({
    connectionLimit: 5,
    host,
    user,
    password,
    database,
    charset: "utf8mb4",
  });

  return new Promise((acc, rej) => {
    pool.query(
      "CREATE TABLE IF NOT EXISTS todo_items (id varchar(36), name varchar(255), completed boolean) DEFAULT CHARSET utf8mb4",
      (err) => {
        if (err) return rej(err);

        console.log(`Connected to mysql db at host ${HOST}`);
        acc();
      },
    );
  });
}

export async function teardown(): Promise<void> {
  return new Promise((acc, rej) => {
    if (!pool) {
      return acc();
    }
    pool.end((err) => {
      if (err) rej(err);
      else acc();
    });
  });
}

export async function getItems(): Promise<TodoItem[]> {
  return new Promise((acc, rej) => {
    pool.query("SELECT * FROM todo_items", (err, rows: DatabaseTodoItem[]) => {
      if (err) return rej(err);
      acc(
        rows.map((item) => ({
          id: item.id,
          name: item.name,
          completed: item.completed === 1,
        })),
      );
    });
  });
}

export async function getItem(id: string): Promise<TodoItem | undefined> {
  return new Promise((acc, rej) => {
    pool.query(
      "SELECT * FROM todo_items WHERE id=?",
      [id],
      (err, rows: DatabaseTodoItem[]) => {
        if (err) return rej(err);
        acc(
          rows.map((item) => ({
            id: item.id,
            name: item.name,
            completed: item.completed === 1,
          }))[0],
        );
      },
    );
  });
}

export async function storeItem(item: TodoItem): Promise<void> {
  return new Promise((acc, rej) => {
    pool.query(
      "INSERT INTO todo_items (id, name, completed) VALUES (?, ?, ?)",
      [item.id, item.name, item.completed ? 1 : 0],
      (err) => {
        if (err) return rej(err);
        acc();
      },
    );
  });
}

export async function updateItem(id: string, item: TodoItem): Promise<void> {
  return new Promise((acc, rej) => {
    pool.query(
      "UPDATE todo_items SET name=?, completed=? WHERE id=?",
      [item.name, item.completed ? 1 : 0, id],
      (err) => {
        if (err) return rej(err);
        acc();
      },
    );
  });
}

export async function removeItem(id: string): Promise<void> {
  return new Promise((acc, rej) => {
    pool.query("DELETE FROM todo_items WHERE id = ?", [id], (err) => {
      if (err) return rej(err);
      acc();
    });
  });
}

const driver: DatabaseDriver = {
  init,
  teardown,
  getItems,
  getItem,
  storeItem,
  updateItem,
  removeItem,
};

export default driver;
