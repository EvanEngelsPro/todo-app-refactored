import express from "express";

import getGreeting from "./routes/getGreeting";
import getItems from "./routes/getItems";
import addItem from "./routes/addItem";
import updateItem from "./routes/updateItem";
import deleteItem from "./routes/deleteItem";

import {
  validateCreateTodo,
  validateUpdateTodo,
} from "./middlewares/validateTodo";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/static"));

app.get("/api/greeting", getGreeting);
app.get("/api/items", getItems);
app.post("/api/items", validateCreateTodo, addItem);
app.put("/api/items/:id", validateUpdateTodo, updateItem);
app.delete("/api/items/:id", deleteItem);

app.use(errorHandler);

export default app;
