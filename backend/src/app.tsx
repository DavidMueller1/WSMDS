import express, { Express, Request, Response } from 'express'
import Db from './db'

console.log('TEST')
const db = new Db()

const app: Express = express()
const port = process.env.PORT

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Serverrr')
    console.log('Express + TypeScript Serverrr')
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is runnnning at http://localhost:${port}`)
})
