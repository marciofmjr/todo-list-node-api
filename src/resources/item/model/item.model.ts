import database from '@core/database'
import { Response } from 'express'

import { Item } from '@prisma/client'
import responder from '@shared/responder'

class ItemModel {
  create = async (res: Response, item: Item): Response<Item> => {
    const created = await database.item.create({ data: item })
    return responder.CREATED(res, created)
  }
}

export default new ItemModel()
