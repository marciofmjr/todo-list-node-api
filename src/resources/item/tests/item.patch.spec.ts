// NODE_ENV=test npx jest src/resources/item/tests/item.patch.spec.ts --verbose --detectOpenHandles --bail --forceExit --watchAll

import request from 'supertest'

import factory from '@shared/factory'
import truncate from '@shared/truncate'
import app from '@core/app'

describe('success', () => {
  beforeEach(async () => await truncate())
  it('PATCH to /items without payload, should not update item', async () => {
    const item = await factory.item({ title: 'clean house', done: false })
    const response = await request(app)
      .patch(`/items/${item.id}`)
      .send()

    expect(response.status).toBe(200)

    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body).toHaveProperty('updatedAt')

    delete response.body.id
    delete response.body.createdAt
    delete response.body.updatedAt

    expect(response.body).toEqual({ title: 'clean house', done: false })
  })
  it('PATCH to /items changing done from false to true, should update item', async () => {
    const item = await factory.item({ title: 'do my task', done: false })
    const response = await request(app)
      .patch(`/items/${item.id}`)
      .send({ done: true })

    expect(response.status).toBe(200)

    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body).toHaveProperty('updatedAt')

    delete response.body.id
    delete response.body.createdAt
    delete response.body.updatedAt

    expect(response.body).toEqual({ title: 'do my task', done: true })
  })
  it('PATCH to /items changing done from true to false, should update item', async () => {
    const item = await factory.item({ title: 'another item', done: true })
    const response = await request(app)
      .patch(`/items/${item.id}`)
      .send({ done: false })

    expect(response.status).toBe(200)

    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body).toHaveProperty('updatedAt')

    delete response.body.id
    delete response.body.createdAt
    delete response.body.updatedAt

    expect(response.body).toEqual({ title: 'another item', done: false })
  })
  it('PATCH to /items changing title and done from true to true, should update item', async () => {
    const item = await factory.item({ title: 'another item', done: true })
    const response = await request(app)
      .patch(`/items/${item.id}`)
      .send({ title: 'changed', done: true })

    expect(response.status).toBe(200)

    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body).toHaveProperty('updatedAt')

    delete response.body.id
    delete response.body.createdAt
    delete response.body.updatedAt

    expect(response.body).toEqual({ title: 'changed', done: true })
  })
})

describe('errors', () => {
  beforeEach(async () => await truncate())

  it('PATCH to /items with invalid id, should not update item', async () => {
    const response = await request(app)
      .patch('/items/baa79abd-85cd-431c-b4e8-1c2dbffa6942')
      .send({ done: true })

    expect(response.status).toBe(400)
    expect(response.body).toBe('item not found')
  })

  it('PATCH to /items with one invalid parameter, should not update item', async () => {
    const item = await factory.item()
    const response = await request(app)
      .patch(`/items/${item.id}`)
      .send({ nonExist: true })

    expect(response.status).toBe(400)
    expect(response.body).toBe('invalid property: nonExist')
  })

  it('PATCH to /items with two invalid parameter, should not update item', async () => {
    const item = await factory.item()
    const response = await request(app)
      .patch(`/items/${item.id}`)
      .send({ nonExist: true, active: false })

    expect(response.status).toBe(400)
    expect(response.body).toBe('invalid properties: nonExist, active')
  })
})
