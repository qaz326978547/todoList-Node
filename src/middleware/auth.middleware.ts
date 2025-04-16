import { Request as ExpressRequest, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

// 定義一個自定義的 Request 類型，擴展 `user` 屬性
interface UserRequest extends ExpressRequest {
    user?: { id: number; email: string }
}

export const authMiddleware = (req: UserRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1] // 獲取 Bearer token

    if (!token) {
        res.status(401).json({ message: '請先登入' })
        return
    }

    try {
        // 驗證 token 並獲取 payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; email: string }
        req.user = { id: decoded.id, email: decoded.email } // 把 user 資料存入 req.user
        next()
    } catch (err) {
        res.status(401).json({ message: '無效的 token' })
        return
    }
}
