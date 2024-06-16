import { Todo } from "../entities/Todo";
import { ITodoRepository } from "../infrastructure/databases/ITodoRepository";

export class TodoService {
    constructor(private todoRepository: ITodoRepository) {}

    async create(title: string, description: string): Promise<Todo> {
        return this.todoRepository.create(title, description);
    }

    async getAll(): Promise<Todo[]> {
        return this.todoRepository.getAll();
    }

    async update(todo: Todo): Promise<Todo> {
        return this.todoRepository.update(todo);
    }

    async getById(id: number): Promise<Todo | null> {
        return this.todoRepository.getById(id);
    }
    
    async delete(id: number): Promise<void> {
        return this.todoRepository.delete(id);
    }
}