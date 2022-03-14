import { Router } from 'express'
import controller from './item.controller'

export default (routes: Router): void => {
  routes.get('/items/:id', controller.get)
  routes.get('/items', controller.list)
  routes.post('/items', controller.create)
  routes.put('/items/:id', controller.update)
  routes.patch('/items/:id', controller.patch)
  routes.delete('/items/:id', controller.delete)
  routes.delete('/items', controller.deleteAll)
}
