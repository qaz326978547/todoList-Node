import { Router } from 'express'
import { register, login } from '../controller/auth.controller'
import { validateRequest } from '../middleware/validate.middleware'
import { loginSchema, registerSchema } from '../schema/auth.schema'
const router = Router()

router.post('/register', validateRequest(registerSchema), register)
router.post('/login', validateRequest(loginSchema), login)

export default router
