import { Request, Response } from 'express'

import { Item } from '@prisma/client'
import filter from '@shared/filter'
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

  patch = async (req: Request, res: Response): Response<Item> => {
    return model.patch(res, req.body, req.params.id)
  }

  update = async (req: Request, res: Response): Response<Item> => {
    return model.update(res, req.body, req.params.id)
  }

  delete = async (req: Request, res: Response): Response<Item> => {
    return model.delete(res, req.params.id)
  }

  deleteAll = async (req: Request, res: Response): Response<Item> => {
    return model.deleteAll(res)
  }
}

export default new ItemController()
