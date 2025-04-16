// src/middleware/validateRequest.middleware.ts
import { Request, Response, NextFunction } from 'express'
import { ObjectSchema } from 'joi'

type ValidationSchemas = {
    body?: ObjectSchema
    query?: ObjectSchema
    params?: ObjectSchema
    headers?: ObjectSchema
}

export function validateRequest(
    schemas: ValidationSchemas
): (req: Request, res: Response, next: NextFunction) => void {
    return (req: Request, res: Response, next: NextFunction): void => {
        const validationTargets: (keyof ValidationSchemas)[] = [
            'body',
            'query',
            'params',
            'headers',
        ]
        const errors: any[] = []

        for (const key of validationTargets) {
            if (schemas[key]) {
                const { error, value } = schemas[key]!.validate(req[key], {
                    abortEarly: false, // 只要有一個錯誤就停止驗證
                    allowUnknown: true, // 允許未知的屬性
                    stripUnknown: true, // 移除未知的屬性
                })

                if (error) {
                    const messages = error.details.map((d) => d.message)
                    res.status(400).json({
                        message: messages.join(', '), // 合併多個訊息為一串
                        status: false,
                    })
                    return // 🔑 重點：明確中止這個 middleware
                } else {
                    req[key] = value
                }
            }
        }

        next() // 繼續到下一個 middleware 或路由處理器
    }
}
