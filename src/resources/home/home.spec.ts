// NODE_ENV=test npx jest src/resources/home/home.spec.ts --verbose --detectOpenHandles --bail --forceExit --watchAll

import request from 'supertest'

import app from '@core/app'
describe('success', () => {
  it('GET to /, should return welcome message as expected', async () => {
    const response = await request(app)
      .get('/')

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ message: 'Welcome to To Do List Api' })
  })
})
