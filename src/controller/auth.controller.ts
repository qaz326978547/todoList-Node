import { Request, Response } from 'express'
import { User } from '../entity/user.entity'
import { AppDataSource } from '../db/data-source'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userRepo = AppDataSource.getRepository(User)

export const register = async (req: Request, res: Response) => {
    const { email, password, name } = req.body

    const existing = await userRepo.findOne({ where: { email } })
    if (existing) {
        res.status(409).json({ message: 'Email 已被註冊' })
        return
    }

    const hashed = await bcrypt.hash(password, 10)
    const newUser = userRepo.create({ email, password: hashed, name })
    await userRepo.save(newUser)

    const token = jwt.sign({ id: newUser.id, email }, process.env.JWT_SECRET!, {
        expiresIn: '7d',
    })
    res.status(201).json({ token })
    return
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body

    const user = await userRepo.findOne({ where: { email } })
    if (!user) {
        res.status(401).json({ message: '帳號或密碼錯誤' })
        return
    }

    const valid = await bcrypt.compare(password, user.password)
    if (!valid) {
        res.status(401).json({ message: '帳號或密碼錯誤' })
        return
    }

    const token = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET!, {
        expiresIn: '7d',
    })
    res.status(200).json({ token })
    return
}
