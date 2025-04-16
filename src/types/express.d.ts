import { User } from './entity/user.entity'

declare global {
    namespace Express {
        interface Request {
            user?: User // user 屬性可選，並且類型是 User 實體
        }
    }
}
