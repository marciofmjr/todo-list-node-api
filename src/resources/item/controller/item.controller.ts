import { Item } from '@prisma/client'
import { Request, Response } from 'express'
import model from '../model/item.model'

class ItemController {
  create = async (req: Request, res: Response): Response<Item> => {
    return this.save(req, res)
  }

  private save = async (req: Request, res: Response, id = ''): Response<Item> => {
    return model.create(res, req.body)
  }
}

export default new ItemController()
