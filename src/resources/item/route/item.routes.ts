import { Router } from 'express'
import itemController from '../controller/item.controller'

export default (routes: Router): void => {
  routes.post('/items', itemController.create)
}
