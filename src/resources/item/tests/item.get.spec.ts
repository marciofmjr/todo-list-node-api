// NODE_ENV=test npx jest src/resources/item/tests/item.get.spec.ts --verbose --detectOpenHandles --bail --forceExit --watchAll

import request from 'supertest'

import app from '@core/app'
import factory from '@shared/factory'
import truncate from '@shared/truncate'
describe('success', () => {
  let ID = ''
  beforeEach(async () => {
    await truncate()
    const item = await factory.item({
      title: 'go to super market'
    })
    ID = item.id
  })

  it('GET to /items/:id, should return item', async () => {
    const response = await request(app)
      .get(`/items/${ID}`)

    expect(response.status).toBe(200)

    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body).toHaveProperty('updatedAt')

    delete response.body.id
    delete response.body.createdAt
    delete response.body.updatedAt

    expect(response.body).toEqual({ title: 'go to super market', done: false })
  })
})

describe('error', () => {
  beforeEach(async () => await truncate())

  it('GET to /items/:id with invalid id, should not return item', async () => {
    const response = await request(app)
      .get('/items/40a7f9f3-0116-4bc5-81e3-8213e358cfab')

    expect(response.status).toBe(400)
    expect(response.body).toBe('item not found')
  })
})
