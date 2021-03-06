// NODE_ENV=test npx jest src/resources/item/tests/item.create.spec.ts --verbose --detectOpenHandles --bail --forceExit --watchAll

import request from 'supertest'

import app from '@core/app'
import truncate from '@shared/truncate'

describe('success', () => {
  beforeEach(async () => await truncate())
  it('POST to /items with valid payload, should create item', async () => {
    const response = await request(app)
      .post('/items')
      .send({ title: 'some item to do here..' })

    expect(response.status).toBe(201)

    expect(response.body).toHaveProperty('id')
    expect(response.body).toHaveProperty('createdAt')
    expect(response.body).toHaveProperty('updatedAt')

    delete response.body.id
    delete response.body.createdAt
    delete response.body.updatedAt

    expect(response.body).toEqual({ title: 'some item to do here..', done: false })
  })
})

describe('errors', () => {
  beforeEach(async () => await truncate())

  it('POST to /items without title, should not create item', async () => {
    const response = await request(app)
      .post('/items')
      .send({ })

    expect(response.status).toBe(422)
    expect(response.body).toBe('"title" is required')
  })
})
