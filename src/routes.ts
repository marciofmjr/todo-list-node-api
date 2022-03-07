import { Request, Response, Router } from 'express'

const routes = Router()

routes.get('/', (req: Request, res: Response): Response => res.json({
  message: 'Welcome to ToDo List Api'
}))

export default routes
