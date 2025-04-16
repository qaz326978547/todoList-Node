import { AppDataSource } from '../db/data-source'
import { Todo } from '../entity/todo.entity'

export class TodoService {
    private repo = AppDataSource.getRepository(Todo)

    async getAll() {
        return this.repo.find()
    }

    async create(todo: Todo) {
        return this.repo.save(todo)
    }

    async update(id: number, updates: Partial<Todo>) {
        // Partial<Todo> 代表只更新部分屬性
        const todo = await this.repo.findOneBy({ id })
        if (!todo) return null
        const updatedTodo = Object.assign(todo, updates)
        return this.repo.save(updatedTodo)
    }

    async delete(id: number) {
        const result = await this.repo.delete(id)
        return result.affected !== 0
    }
}
