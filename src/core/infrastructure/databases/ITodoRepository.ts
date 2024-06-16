import { Todo } from "../../entities/Todo";

export interface ITodoRepository {
    create(title: string, description: string): Promise<Todo>;
    getAll(): Promise<Todo[]>;
    update(todo: Todo): Promise<Todo>;
    getById(id: number): Promise<Todo | null>;
    delete(id: number): Promise<void>;
}
