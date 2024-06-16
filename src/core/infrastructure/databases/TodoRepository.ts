import { PrismaClient } from "@prisma/client";
import { Todo } from "../../entities/Todo";
import { ITodoRepository } from "./ITodoRepository";

export class TodoRepository implements ITodoRepository {
    constructor(private prisma: PrismaClient) {}

    async create(title: string, description: string): Promise<Todo> {
        const newTodo = await this.prisma.todo.create({
            data: {
                title,
                description
            }
        });
        return new Todo(newTodo.id, newTodo.title, newTodo.description, newTodo.completed);
    }

    async getAll(): Promise<Todo[]> {
        const todos = await this.prisma.todo.findMany();
        return todos.map(todo => new Todo(todo.id, todo.title, todo.description, todo.completed));
    }

    async update(todo: Todo): Promise<Todo> {
        const updatedTodo = await this.prisma.todo.update({
            where: { id: todo.id },
            data: {
                title: todo.title,
                description: todo.description,
                completed: todo.completed
            }
        });
        return new Todo(updatedTodo.id, updatedTodo.title, updatedTodo.description, updatedTodo.completed);
    }

    async getById(id: number): Promise<Todo | null> {
        const todo = await this.prisma.todo.findUnique({
            where: { id }
        });
        if (!todo) {
            return null;
        }
        return new Todo(todo.id, todo.title, todo.description, todo.completed);
    }

    async delete(id: number): Promise<void> {
        await this.prisma.todo.delete({
            where: { id }
        });
    }

}