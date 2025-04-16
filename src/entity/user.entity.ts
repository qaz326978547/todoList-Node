import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
} from 'typeorm'
import { Todo } from './todo.entity'

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({ unique: true })
    email: string = ''

    @Column()
    password: string = ''

    @Column()
    name: string = ''

    @CreateDateColumn()
    created_at: Date = new Date()

    @UpdateDateColumn()
    updated_at: Date = new Date()

    @OneToMany(() => Todo, (todo) => todo.userId)
    todos?: Todo[] // 一個使用者可以有多個 Todo
}
