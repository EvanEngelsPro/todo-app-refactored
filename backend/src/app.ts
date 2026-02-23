import express from "express";

import path from "path";
import { fileURLToPath } from "url";

import getGreeting from "./routes/getGreeting.js";
import getItems from "./routes/getItems.js";
import addItem from "./routes/addItem.js";
import updateItem from "./routes/updateItem.js";
import deleteItem from "./routes/deleteItem.js";

import {
  validateCreateTodo,
  validateUpdateTodo,
} from "./middlewares/validateTodo.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "static")));

app.get("/api/greeting", getGreeting);
app.get("/api/items", getItems);
app.post("/api/items", validateCreateTodo, addItem);
app.put("/api/items/:id", validateUpdateTodo, updateItem);
app.delete("/api/items/:id", deleteItem);

app.use(errorHandler);

export default app;
