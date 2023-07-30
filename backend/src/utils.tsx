import jwt from 'jsonwebtoken'

export const decodeToken = (token: string | undefined) => {
    if (!token) return undefined
    const relevantToken = token.split(' ')[1]
    if (token) {
        const decoded = jwt.decode(token)
        console.log(decoded)
        return decoded
    }
    return undefined
}
