import { RequestHandler } from "express";
import { deleteTodo } from "../services/todoService.js";

interface DeleteParams {
  id: string;
}

const deleteItem: RequestHandler<DeleteParams> = async (req, res) => {
  await deleteTodo(req.params.id);

  res.sendStatus(200);
};

export default deleteItem;
