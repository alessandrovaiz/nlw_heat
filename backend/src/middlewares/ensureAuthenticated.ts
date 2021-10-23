import { Request, Response, NextFunction, response } from 'express'
import { verify } from 'jsonwebtoken'

interface IPayload {
    sub: string
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers.authorization
    
    if(!authToken) {
        return response.status(401).json({
            error: 'Token not provided'
        })
    }

    const [,token] = authToken.split(" ")
    try {
        const  { sub } = verify(token, process.env.JWT_SECRET) as IPayload
        req.user_id = sub

        return next()
        
    } catch (err) {
        return response.status(401).json({
            error: 'Token expired'
        })
    }

}