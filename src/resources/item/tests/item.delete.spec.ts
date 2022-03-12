// NODE_ENV=test npx jest src/resources/item/tests/item.delete.spec.ts --verbose --detectOpenHandles --bail --forceExit --watchAll

import request from 'supertest'

import app from '@core/app'
import factory from '@shared/factory'
import truncate from '@shared/truncate'
describe('success', () => {
  beforeEach(async () => await truncate())

  it('DELETE to /items/:id, should delete item', async () => {
    const item = await factory.item({ title: 'buy a new car' })
    const response = await request(app)
      .delete(`/items/${item.id}`)

    expect(response.status).toBe(200)

    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body).toHaveProperty('updatedAt')

    delete response.body.id
    delete response.body.createdAt
    delete response.body.updatedAt

    expect(response.body).toEqual({ title: 'buy a new car', done: false })
  })
})

describe('error', () => {
  beforeEach(async () => await truncate())

  it('DELETE to /items/:id with invalid id, should not delete item', async () => {
    const response = await request(app)
      .delete('/items/8c805ace-5d7b-48ba-98a3-3977d7b346e3')

    expect(response.status).toBe(400)
    expect(response.body).toBe('item not found')
  })
})
