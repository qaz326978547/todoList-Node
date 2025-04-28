import 'dotenv/config'
import express from 'express'
import { AppDataSource } from './db/data-source'
import todoRoutes from './routes/todo.routes'
import authRoutes from './routes/auth.routes'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger'
import path from 'path'
import cors from 'cors'
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))
// 啟用 CORS，允許憑證並指定來源
app.use(
    cors({
        origin: 'https://testfornt.zeabur.app/', // 指定允許的來源
        credentials: true, // 允許攜帶憑證（如 Cookie）
    })
)
app.use('/api/todos', todoRoutes)
app.use('/api/auth', authRoutes)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

AppDataSource.initialize().then(() => console.log('DB connected'))

export default app
