import { RowDataPacket } from "mysql2";

export interface TodoItem {
  id: string;
  name: string;
  completed: boolean;
}

export interface DatabaseTodoItem extends RowDataPacket {
  id: string;
  name: string;
  completed: number;
}

export interface DatabaseDriver {
  init(): Promise<void>;
  teardown(): Promise<void>;
  getItems(): Promise<TodoItem[]>;
  getItem(id: string): Promise<TodoItem | undefined>;
  storeItem(item: TodoItem): Promise<void>;
  updateItem(id: string, item: TodoItem): Promise<void>;
  removeItem(id: string): Promise<void>;
}
