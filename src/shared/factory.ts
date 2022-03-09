import database from '@core/database'
import { Item } from '@prisma/client'
import faker from 'faker-br'

interface ItemFactory {
    title?: string
}

class Factory {
  async item(itemFactory?: ItemFactory): Promise<Item> {
    return database.item.create({
      data: {
        title: itemFactory?.title || faker.name.firstName()
      }
    })
  }
}

export default new Factory()
