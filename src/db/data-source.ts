import { DataSource } from 'typeorm'
import { Todo } from '../entity/todo.entity'
import { User } from '../entity/user.entity'
export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'postgres', // 默認使用 postgres 作為 host
    port: Number(process.env.DATABASE_PORT) || 5432, // 默認使用 5432
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [Todo, User],
    synchronize: true,
})
