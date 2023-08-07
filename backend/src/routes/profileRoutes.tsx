import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { Db } from '../db'
import { Logger } from '../logger'

const createProfileRouter = (db: Db) => {
    const router = require('express').Router()

    router.get('/', (req: Request, res: Response) => {
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

    router.post('/', (req: Request, res: Response) => {
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

    router.put('/name', (req: Request, res: Response) => {
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

    return router
}

export default createProfileRouter
