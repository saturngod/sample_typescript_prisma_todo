import { PrismaClient } from "@prisma/client";
import { TodoService } from "../src/core/usecases/TodoService";
import { TodoRepository } from "../src/core/infrastructure/databases/TodoRepository";

const prisma = new PrismaClient();
const todoRepository = new TodoRepository(prisma);
const todoService = new TodoService(todoRepository);

const clearDatabase = async () => {
    await prisma.todo.deleteMany();
};

beforeAll(async () => {
    await prisma.$connect();
});

beforeEach(async () => {
    clearDatabase();
});

afterAll(async () => {
    clearDatabase();
    await prisma.$disconnect();
});

describe("TodoService", () => {
    it('should create a new todo with Title and descscription' , async () => {
        const todo = await todoService.create("simple title","simple description");
        expect(todo.title).toBe("simple title");
        expect(todo.description).toBe("simple description");
        expect(todo.completed).toBe(false);
    });

    it('should get all todos from the database',async () => {
        await todoService.create("simple title","simple description");
        await todoService.create("simple title","simple description");
        const todos = await todoService.getAll();
        expect(todos.length).toBe(2);
    });

    it('should update with todo with id and give the complet to true', async () => {
        let todo = await todoService.create("simple title","simple description");
        todo.completed = true;
        const updatedTodo = await todoService.update(todo);
        expect(updatedTodo.completed).toBe(true);
    });

    it('should get todo by id', async () => {
        let todo = await todoService.create("simple title","simple description");
        const foundTodo = await todoService.getById(todo.id);
        expect(foundTodo).not.toBeNull();
        if(foundTodo === null) return;
        expect(foundTodo.id).toBe(todo.id);
    });

    it('should delete todo with id ', async () => {
        let todo = await todoService.create("simple title","simple description");
        await todoService.delete(todo.id);
        const foundTodo = await todoService.getById(todo.id);
        expect(foundTodo).toBeNull();
    });

});


