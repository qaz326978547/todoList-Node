import { Router } from 'express'
import { TodoController } from '../controller/todo.controller'
import { validateRequest } from '../middleware/validate.middleware'
import { authMiddleware } from '../middleware/auth.middleware'
import { createTodoSchema, updateTodoSchema, idParamSchema } from '../schema/todo.schema'

const router = Router()

router.get('/', authMiddleware, TodoController.getTodos)

router.post(
    '/',
    authMiddleware,
    validateRequest({ body: createTodoSchema }),
    TodoController.createTodo
)

router.patch(
    '/:id',
    authMiddleware,
    validateRequest({ params: idParamSchema, body: updateTodoSchema }),
    TodoController.updateTodo
)

router.delete(
    '/:id',
    authMiddleware,
    validateRequest({ params: idParamSchema }),
    TodoController.deleteTodo
)

export default router
