import { Request, Response } from "express";
import { createTodo } from "../services/todoService.js";

export default async (req: Request, res: Response): Promise<void> => {
  const item = await createTodo(req.body.name);

  res.status(201).json(item);
};
