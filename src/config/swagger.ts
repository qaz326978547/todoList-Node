import swaggerJSDoc from 'swagger-jsdoc'

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Todo API',
        version: '1.0.0',
    },
}

const options = {
    swaggerDefinition,
    apis: ['./src/routes/*.ts'],
}

export default swaggerJSDoc(options)
