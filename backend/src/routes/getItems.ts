import { Request, Response } from "express";
import { getAllTodos } from "../services/todoService.js";

export default async (req: Request, res: Response): Promise<void> => {
  const items = await getAllTodos();

  res.json(items);
};
