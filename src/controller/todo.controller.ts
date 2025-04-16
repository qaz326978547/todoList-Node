import { Request, Response } from 'express'
import { TodoService } from '../service/todo.service'

const service = new TodoService()
interface UserRequest extends Request {
    user?: { id: number; email: string }
}
export class TodoController {
    static async getTodos(req: Request, res: Response) {
        const todos = await service.getAll()
        res.json(todos)
    }

    static async createTodo(req: Request, res: Response) {
        const todo = req.body
        const userId = (req as UserRequest).user?.id
        if (!userId) {
            res.status(401).json({ message: '用戶未登入' }) // 如果沒有 userId，則拒絕操作
            return
        }

        // 確保待辦事項包含 userId
        const newTodo = await service.create({ ...todo, userId })
        res.status(201).json(newTodo)
    }

    static async updateTodo(req: Request, res: Response) {
        const id = Number(req.params.id)
        const updates = req.body
        const updated = await service.update(id, updates)
        if (!updated) {
            res.status(404).json({ message: '找不到此 Todo' })
            return
        }
        res.json(updated)
    }

    static async deleteTodo(req: Request, res: Response) {
        const id = Number(req.params.id)
        const result = await service.delete(id)
        if (!result) {
            res.status(404).json({ message: '找不到此 Todo' })
            return
        }
        res.status(204).send()
    }
}
