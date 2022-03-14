// NODE_ENV=test npx jest src/resources/item/tests/item.delete.all.spec.ts --verbose --detectOpenHandles --bail --forceExit --watchAll
import request from 'supertest'

import factory from '@shared/factory'
import truncate from '@shared/truncate'
import app from '@core/app'
import database from '@core/database'

describe('success', () => {
  beforeEach(async () => await truncate())

  it('DELETE to /items, should delete all items', async () => {
    await factory.item()
    await factory.item()
    await factory.item()
    await factory.item()

    const response = await request(app)
      .delete('/items')

    expect(response.status).toBe(200)

    const items = await database.item.findMany()
    expect(items.length).toBe(0)
  })
})
