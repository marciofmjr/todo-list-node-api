// NODE_ENV=test npx jest src/resources/item/tests/item.update.spec.ts --verbose --detectOpenHandles --bail --forceExit --watchAll

import request from 'supertest'

import app from '@core/app'
import truncate from '@shared/truncate'
import factory from '@shared/factory'

describe('success', () => {
  beforeEach(async () => await truncate())
  it('PUT to /items with valid payload, should update item', async () => {
    const item = await factory.item({ title: 'get a gift' })
    const response = await request(app)
      .put(`/items/${item.id}`)
      .send({ title: 'buy a gift' })

    expect(response.status).toBe(200)

    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body).toHaveProperty('updatedAt')

    delete response.body.id
    delete response.body.createdAt
    delete response.body.updatedAt

    expect(response.body).toEqual({ title: 'buy a gift', done: false })
  })
})

describe('error', () => {
  beforeEach(async () => await truncate())
  it('PUT to /items with invalid payload, should not update item', async () => {
    const item = await factory.item()
    const response = await request(app)
      .put(`/items/${item.id}`)
      .send({ })

    expect(response.status).toBe(422)
    expect(response.body).toEqual('"title" is required')
  })
  it('PUT to /items with invalid id, should not update item', async () => {
    const response = await request(app)
      .put('/items/bc9ecf6e-1daf-49dc-8133-b97082a00333')
      .send({ title: 'clean house' })

    expect(response.status).toBe(400)
    expect(response.body).toEqual('item not found')
  })
})
