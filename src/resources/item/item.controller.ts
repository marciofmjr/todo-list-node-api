import { Item } from '@prisma/client'
import filter from '@shared/filter'
import { Request, Response } from 'express'
import model from './item.model'

class ItemController {
  get = async (req: Request, res: Response): Response<Item> => {
    return model.get(res, req.params.id)
  }

  list = async (req: Request, res: Response): Response<Item[]> => {
    return model.list(res, filter(req.query))
  }

  create = async (req: Request, res: Response): Response<Item> => {
    return model.create(res, req.body)
  }

  update = async (req: Request, res: Response): Response<Item> => {
    return model.update(res, req.body, req.params.id)
  }
}

export default new ItemController()
