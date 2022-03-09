import { Router } from 'express'
import itemController from '../controller/item.controller'

export default (routes: Router): void => {
  routes.get('/items/:id', itemController.get)
  routes.post('/items', itemController.create)
  routes.put('/items/:id', itemController.update)
}
