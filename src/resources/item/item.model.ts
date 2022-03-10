import database from '@core/database'
import { Response } from 'express'

import { Item } from '@prisma/client'
import validate from './item.validator'
import responder from '@shared/responder'
import { Filter } from '@shared/filter'

class ItemModel {
  get = async (res: Response, id: string): Response<Item> => {
    try {
      const item = await database.item.findUnique({ where: { id } })
      if (!item) return responder.BAD_REQUEST(res, 'item not found')
      return responder.OK(res, item)
    } catch (e) {
      return responder.INTERNAL_SERVER_ERROR(res, e)
    }
  }

  list = async (res: Response, filter: Filter): Response<Item[]> => {
    try {
      const items = await database.item.findMany(filter)
      return responder.OK(res, items)
    } catch (e) {
      return responder.INTERNAL_SERVER_ERROR(res, e)
    }
  }

  create = async (res: Response, data: Item): Response<Item> => {
    try {
      const error = await validate(data)
      if (error !== 'ok') return responder.UNPROCESSABLE_ENTITY(res, error)

      const item = await database.item.create({ data })
      return responder.CREATED(res, item)
    } catch (e) {
      return responder.INTERNAL_SERVER_ERROR(res, e)
    }
  }

  update = async (res: Response, data: Item, id: string): Response<Item> => {
    try {
      let item = await database.item.findUnique({ where: { id } })
      if (!item) return responder.BAD_REQUEST(res, 'item not found')

      const error = await validate(data)
      if (error !== 'ok') return responder.UNPROCESSABLE_ENTITY(res, error)

      item = await database.item.update({ data, where: { id } })
      return responder.OK(res, item)
    } catch (e) {
      return responder.INTERNAL_SERVER_ERROR(res, e)
    }
  }

  delete = async (res: Response, id: string): Response<Item> => {
    try {
      const item = await database.item.findUnique({ where: { id } })
      if (!item) return responder.BAD_REQUEST(res, 'item not found')

      await database.item.delete({ where: { id } })
      return responder.OK(res, item)
    } catch (e) {
      return responder.INTERNAL_SERVER_ERROR(res, e)
    }
  }
}

export default new ItemModel()
