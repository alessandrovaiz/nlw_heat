import { Request, Response } from 'express'
import { CreateMessageService } from '../services/createMessageService'

class CreateMessageController {
    async handle(req: Request, res: Response) {
        try {
           const { message } = req.body
           const { user_id } = req
           
           const service = new CreateMessageService()

           const result = await service.execute(message, user_id)
           
           return res.json(result)
        } catch (err) {
            return res.json({
                success: false,
                error : err.message
            })
        }
    }
}

export { CreateMessageController }