import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 3000
export const ATLAS_URL = process.env.ATLAS_URL || 'No ATLAS_URL provided'
