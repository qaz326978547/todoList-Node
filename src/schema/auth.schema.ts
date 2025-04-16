import Joi from 'joi'

export const registerSchema = {
    body: Joi.object({
        email: Joi.string().email().required().messages({
            'string.email': '請輸入有效的電子郵件地址',
            'any.required': 'email 欄位為必填',
            'string.empty': 'email 欄位不得為空',
            'string.base': 'email 必須是字串',
        }),
        password: Joi.string().min(6).required().messages({
            'string.min': '密碼至少需要 6 個字元',
            'any.required': 'password 欄位為必填',
            'string.empty': 'password 欄位不得為空',
            'string.base': 'password 必須是字串',
        }),
        name: Joi.string().required().messages({
            'any.required': 'name 欄位為必填',
            'string.empty': 'name 欄位不得為空',
            'string.base': 'name 必須是字串',
        }),
    }),
}

export const loginSchema = {
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }).messages({
        'string.email': '請輸入有效的電子郵件地址',
        'any.required': '所有欄位都是必填的',
        'string.base': '所有欄位必須是字串',
        'string.empty': '所有欄位不得為空',
    }),
}
