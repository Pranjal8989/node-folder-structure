import express, { Application, NextFunction, Request, Response } from 'express'
import path from 'path'
import router from './router/apiRouter'
import globalHandlerError from './middleware/globalHandlerError'
import responseMessage from './costant/responseMessage'
import httpError from './util/httpError'

const app: Application = express()

//Middleware
app.use(express.json())
app.use(express.static(path.join(__dirname, '../', 'public')))

//Routes
app.use('/api/v1/', router)

// 404 handler
app.use((req: Request, _: Response, next: NextFunction) => {
    try {
        throw new Error(responseMessage.NOT_FOUND('route'))
    } catch (err) {
        httpError(next, err, req, 404)
    }
})

//Global error handler
app.use(globalHandlerError)

export default app
