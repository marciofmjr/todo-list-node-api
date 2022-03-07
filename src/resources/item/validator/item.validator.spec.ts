// NODE_ENV=test npx jest src/resources/item/validator/item.validator.spec.ts --verbose --detectOpenHandles --bail --forceExit --watchAll

import validate from './item.validator'

describe('success', () => {
  it('given valid payload to validator, it should return ok [1]', async () => {
    const payload = { title: 'go to super market' }
    const valid = await validate(payload)
    expect(valid).toBe('ok')
  })
  it('given valid payload with title with 28 characters, it should return ok [1]', async () => {
    const payload = { title: 'buy my new notebook tomorrow' }
    const valid = await validate(payload)
    expect(valid).toBe('ok')
  })
})

describe('error', () => {
  it('given empty payload, it should return error [1]', async () => {
    const payload = ''
    const valid = await validate(payload)
    expect(valid).toBe('"title" is required')
  })
  it('given undefined payload, it should return error [2]', async () => {
    const payload = undefined
    const valid = await validate(payload)
    expect(valid).toBe('"title" is required')
  })
})
