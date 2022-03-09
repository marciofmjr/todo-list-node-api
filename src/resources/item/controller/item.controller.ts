import { Item } from '@prisma/client'
import { Request, Response } from 'express'
import model from '../model/item.model'

class ItemController {
  get = async (req: Request, res: Response): Response<Item> => {
    return model.get(res, req.params.id)
  }

  create = async (req: Request, res: Response): Response<Item> => {
    return model.create(res, req.body)
  }

  update = async (req: Request, res: Response): Response<Item> => {
    return model.update(res, req.body, req.params.id)
  }
}

export default new ItemController()
