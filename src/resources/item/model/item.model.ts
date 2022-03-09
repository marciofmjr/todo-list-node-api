import database from '@core/database'
import { Response } from 'express'

import { Item } from '@prisma/client'
import validate from '../validator/item.validator'
import responder from '@shared/responder'

class ItemModel {
  create = async (res: Response, item: Item): Response<Item> => {
    try {
      const error = await validate(item)
      if (error !== 'ok') return responder.UNPROCESSABLE_ENTITY(res, error)

      const created = await database.item.create({ data: item })
      return responder.CREATED(res, created)
    } catch (e) {
      return responder.INTERNAL_SERVER_ERROR(res, e)
    }
  }
}

export default new ItemModel()
