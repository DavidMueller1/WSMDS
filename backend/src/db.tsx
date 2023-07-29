import { MongoClient } from 'mongodb'
import { ATLAS_URL } from './environmentVariables'

class Db {
    dbClient = new MongoClient(ATLAS_URL)

    constructor() {
        console.log('Connecting to database...')
        this.dbClient.connect().then(
            () => {
                console.log('Connected to database')
            },
            (err) => {
                console.log('Could not connect to database')
                console.log(err)
            },
        )
    }
}

export default Db
