import express, { Express, Request, Response } from 'express'
import { Db } from './db'
import WebSocket from 'ws'
import { auth } from 'express-oauth2-jwt-bearer'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import bodyParser from 'body-parser'
import ngrok from 'ngrok'
// import { expressjwt, GetVerificationKey } from 'express-jwt'
// import { expressJwtSecret } from 'jwks-rsa'
import { auth0Config } from './auth0Config'
import * as https from 'https'
import * as fs from 'fs'
import { readFileSync } from 'fs'
import { throwExpression } from './utils'
import { Logger } from './logger'

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

// Test secure route
app.get('/api/profile', jwtCheck, (req: Request, res: Response) => {
    const decoded = jwt.decode(req.headers.authorization?.split(' ')[1] as string)
    db.getUser(decoded?.sub as string).then(
        (user) => {
            res.status(200).send(user)
        },
        (err) => {
            res.status(404).send()
        },
    )
})

app.post('/api/profile', jwtCheck, (req: Request, res: Response) => {
    const decoded = jwt.decode(req.headers.authorization?.split(' ')[1] as string)
    const sub = decoded?.sub as string
    const name = req.body.userName as string
    db.getUser(sub).then(
        () => {
            res.status(400).send('User already exists')
        },
        () => {
            db.addUser(sub, name).then(
                (user) => {
                    res.status(201).send(user)
                },
                (err) => {
                    res.status(500).send(err)
                },
            )
        },
    )
})

app.put('/api/profile/name', jwtCheck, (req: Request, res: Response) => {
    Logger.express('put /api/profile/name')
    const decoded = jwt.decode(req.headers.authorization?.split(' ')[1] as string)
    const sub = decoded?.sub as string
    const name = req.body.userName as string
    db.changeUserName(sub, name).then(
        (user) => {
            res.status(200).send(user)
        },
        (err) => {
            res.status(500).send(err)
        },
    )
})

db.init().then(() => {
    app.listen(PORT, () => {
        Logger.express(`Server is runnnning at http://localhost:${PORT}`)
    })
})
