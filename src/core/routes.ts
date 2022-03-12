import { Request, Response, Router } from 'express'
import itemRoutes from '@resources/item/item.routes'

const routes = Router()

routes.get('/', (req: Request, res: Response): Response => res.json({
  message: 'Welcome to To Do List Api'
}))

itemRoutes(routes)

export default routes
