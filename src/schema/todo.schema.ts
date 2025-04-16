// src/schema/todo.schema.ts
import Joi from 'joi'

export const createTodoSchema = Joi.object({
    title: Joi.string().min(1).max(100).required().messages({
        'string.base': '標題必須是字串',
        'string.empty': '標題不得為空',
        'string.min': '標題必須至少有 1 個字元',
        'string.max': '標題必須最多有 100 個字元',
        'any.required': '標題為必填欄位',
    }),
    completed: Joi.boolean().optional().messages({
        'boolean.base': 'completed 必須是布林值',
    }),
})

// src/schema/todo.schema.ts
export const updateTodoSchema = Joi.object({
    title: Joi.string().min(1).max(100).messages({
        'string.base': '標題必須是字串',
        'string.empty': '標題不得為空',
        'string.min': '標題至少需 1 字元',
        'string.max': '標題最多 100 字元',
    }),
    completed: Joi.boolean().messages({
        'boolean.base': 'completed 必須是布林值',
    }),
})
    .min(1)
    .messages({
        'object.min': '至少要提供一個欄位來更新',
    })

export const idParamSchema = Joi.object({
    id: Joi.number().integer().positive().required().messages({
        'number.base': 'ID 必須是數字',
        'number.integer': 'ID 必須是整數',
        'number.positive': 'ID 必須為正整數',
        'any.required': 'ID 是必要的參數',
    }),
})
