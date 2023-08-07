import express, { Express, Request, Response } from 'express'
import { Db } from './db'
import WebSocket from 'ws'
import { auth } from 'express-oauth2-jwt-bearer'
import cors from 'cors'
import bodyParser from 'body-parser'
import { auth0Config } from './auth0Config'
import { throwExpression } from './utils'
import { Logger } from './logger'
import createProfileRouter from './routes/profileRoutes'

// Cast to int
const PORT = +(process.env.PORT ?? throwExpression('PORT is undefined in environment variables'))

// Simple Websocket server that returns the current time every second
const wss = new WebSocket.Server({ port: 8080 })
wss.on('connection', (ws: WebSocket) => {
    setInterval(() => {
        ws.send(new Date().toTimeString())
    }, 1000)
})

const app: Express = express()

app.use(cors())
app.use(bodyParser.json())

// Middleware for JWT verification
const jwtCheck = auth({
    audience: auth0Config.audience,
    issuerBaseURL: auth0Config.issuer,
})

const db = new Db()

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Serverrr')
    console.log('Express + TypeScript Serverrr')
})

const profileRouter = createProfileRouter(db)
app.use('/api/profile', jwtCheck, profileRouter)

db.init().then(() => {
    app.listen(PORT, () => {
        Logger.express(`Server is runnnning at http://localhost:${PORT}`)
    })
})
