import express, { Request, Response } from 'express'
import { coursesRouter } from './routes/courses-router'
import { runDb } from './repositiries/db'


const app = express()

const port = process.env.PORT || 3000



const jsonBodyMiddleware = express.json()
app.use(jsonBodyMiddleware)



app.use('/courses', coursesRouter)


const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}


startApp()





