import { Collection, MongoClient } from 'mongodb'
import { ATLAS_URL } from './environmentVariables'

// Data class for user
export interface User {
    userId: string
    userName: string
    role: string
}

export class Db {
    dbClient = new MongoClient(ATLAS_URL)
    userCollection: Collection | undefined

    constructor() {}

    init = () => {
        return new Promise<void>((resolve) => {
            this.dbClient.connect().then(
                () => {
                    console.log('Connected to database')
                    this.userCollection = this.dbClient.db('WSMDS').collection('users')
                    resolve()
                },
                (err) => {
                    console.log('Could not connect to database')
                    console.log(err)
                    throw new Error('Could not connect to database')
                },
            )
        })
    }

    getUser = (userId: string) => {
        return new Promise<User>((resolve, reject) => {
            this.userCollection?.findOne({ userId: userId }).then((res) => {
                if (res) {
                    console.log('User found')
                    console.log(res)
                    resolve({
                        userId: res.userId,
                        userName: res.userName,
                        role: res.role,
                    })
                } else {
                    reject(new Error('User not found'))
                }
            })
        })
    }

    addUser = (userId: string, userName: string) => {
        return new Promise<User>((resolve, reject) => {
            this.userCollection
                ?.insertOne({
                    userId: userId,
                    userName: userName,
                    role: 0,
                })
                .then((res) => {
                    if (res.acknowledged) {
                        console.log('User added')
                        this.getUser(userId).then((user) => {
                            resolve(user)
                        })
                    } else {
                        reject(new Error('User could not be added'))
                    }
                })
        })
    }
}
