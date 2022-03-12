// NODE_ENV=test npx jest src/resources/item/tests/item.list.spec.ts --verbose --detectOpenHandles --bail --forceExit --watchAll

import request from 'supertest'

import app from '@core/app'
import factory from '@shared/factory'
import truncate from '@shared/truncate'

describe('success', () => {
  beforeEach(async () => {
    await truncate()

    await factory.item({ title: 'go to church' })
    await factory.item({ title: 'go to super market' })
    await factory.item({ title: 'clean house' })
    await factory.item({ title: 'pay the bills' })
    await factory.item({ title: 'fix home car' })
    await factory.item({ title: 'buy a new notebook' })
    await factory.item({ title: 'check the weather' })
  })

  it('GET to /items, should return a list of items', async () => {
    const response = await request(app)
      .get('/items')

    expect(response.status).toBe(200)

    for (const item of response.body) {
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('createdAt')
      expect(item).toHaveProperty('updatedAt')

      delete item.id
      delete item.createdAt
      delete item.updatedAt
    }

    expect(response.body).toEqual([
      { title: 'check the weather', done: false },
      { title: 'buy a new notebook', done: false },
      { title: 'fix home car', done: false },
      { title: 'pay the bills', done: false },
      { title: 'clean house', done: false },
      { title: 'go to super market', done: false },
      { title: 'go to church', done: false }
    ])
  })

  it('GET to /items filtering by title, should return a list of items', async () => {
    const response = await request(app)
      .get('/items?q=title:*the*')

    expect(response.status).toBe(200)

    for (const item of response.body) {
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('createdAt')
      expect(item).toHaveProperty('updatedAt')

      delete item.id
      delete item.createdAt
      delete item.updatedAt
    }

    expect(response.body).toEqual([
      { title: 'check the weather', done: false },
      { title: 'pay the bills', done: false }
    ])
  })

  it('GET to /items ordering by title:asc, should return a list of items', async () => {
    const response = await request(app)
      .get('/items?order=title:asc')

    expect(response.status).toBe(200)

    for (const item of response.body) {
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('createdAt')
      expect(item).toHaveProperty('updatedAt')

      delete item.id
      delete item.createdAt
      delete item.updatedAt
    }

    expect(response.body).toEqual([
      { title: 'buy a new notebook', done: false },
      { title: 'check the weather', done: false },
      { title: 'clean house', done: false },
      { title: 'fix home car', done: false },
      { title: 'go to church', done: false },
      { title: 'go to super market', done: false },
      { title: 'pay the bills', done: false }
    ])
  })
  it('GET to /items getting page 1,limiting to 3 and ordering by title:desc, should return a list of items', async () => {
    const response = await request(app)
      .get('/items?page=1&limit=3&order=title:desc')

    expect(response.status).toBe(200)

    for (const item of response.body) {
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('createdAt')
      expect(item).toHaveProperty('updatedAt')

      delete item.id
      delete item.createdAt
      delete item.updatedAt
    }

    expect(response.body).toEqual([
      { title: 'pay the bills', done: false },
      { title: 'go to super market', done: false },
      { title: 'go to church', done: false }
    ])
  })

  it('GET to /items getting page 2,limiting to 3 and ordering by title:desc, should return a list of items', async () => {
    const response = await request(app)
      .get('/items?page=2&limit=3&order=title:desc')

    expect(response.status).toBe(200)

    for (const item of response.body) {
      expect(item).toHaveProperty('id')
      expect(item).toHaveProperty('createdAt')
      expect(item).toHaveProperty('updatedAt')

      delete item.id
      delete item.createdAt
      delete item.updatedAt
    }

    expect(response.body).toEqual([
      { title: 'fix home car', done: false },
      { title: 'clean house', done: false },
      { title: 'check the weather', done: false }
    ])
  })
  it('GET to /items filtering by "a", getting page 1 and limiting to 1, should return a list of items', async () => {
    const response = await request(app)
      .get('/items?q=a&page=1&limit=1')

    expect(response.status).toBe(200)
  })
})
