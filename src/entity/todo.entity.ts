import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity()
export class Todo {
    @PrimaryGeneratedColumn() // 自動生成的主鍵
    id!: number // 使用 `!` 表示這個屬性在初始化後一定有值，TypeScript 不會再報錯

    @Column()
    userId: string = '' // 預設值為空字串

    @Column()
    title: string = '' // 預設值為空字串

    @Column({ default: false })
    completed: boolean = false // 預設值為 false

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date = new Date() // 預設值為當前時間
}
