// NODE_ENV=test npx jest src/shared/filter.spec.ts --verbose --detectOpenHandles --bail --forceExit --watchAll

import filter from './filter'

it('given empty object params, should return as expected', async () => {
  const params = filter({})
  expect(params).toEqual({
    skip: 0,
    take: 50,
    orderBy: { createdAt: 'desc' }
  })
})
it('given empty params, should return as expected', async () => {
  const params = filter()
  expect(params).toEqual({
    skip: 0,
    take: 50,
    orderBy: { createdAt: 'desc' }
  })
})

it('given undefined params, should return as expected', async () => {
  const params = filter(undefined)
  expect(params).toEqual({
    skip: 0,
    take: 50,
    orderBy: { createdAt: 'desc' }
  })
})

it('given q=name:*house , should return as expected', async () => {
  const params = filter({ q: 'name:*house' })
  expect(params).toEqual({
    skip: 0,
    take: 50,
    orderBy: { createdAt: 'desc' },
    where: { name: { startsWith: 'house' } }
  })
})

it('given q=name:house*,active:true , should return as expected', async () => {
  const params = filter({ q: 'name:house*,active:true' })
  expect(params).toEqual({
    skip: 0,
    take: 50,
    orderBy: { createdAt: 'desc' },
    where: { name: { endsWith: 'house' }, active: true }
  })
})

it('given q=name:*house* , should return as expected', async () => {
  const params = filter({ q: 'name:*house*' })
  expect(params).toEqual({
    skip: 0,
    take: 50,
    orderBy: { createdAt: 'desc' },
    where: { name: { contains: 'house' } }
  })
})

it('given page=1&limit=5, should return as expected', async () => {
  const params = filter({ page: 1, limit: 5 })
  expect(params).toEqual({
    skip: 0,
    take: 5,
    orderBy: { createdAt: 'desc' }
  })
})

it('given page=2&limit=5, should return as expected', async () => {
  const params = filter({ page: 2, limit: 5 })
  expect(params).toEqual({
    skip: 5,
    take: 5,
    orderBy: { createdAt: 'desc' }
  })
})

it('given page=3&limit=5, should return as expected', async () => {
  const params = filter({ page: 3, limit: 5 })
  expect(params).toEqual({
    skip: 10,
    take: 5,
    orderBy: { createdAt: 'desc' }
  })
})

it('given order=title, should return as expected', async () => {
  const params = filter({ order: 'title' })
  expect(params).toEqual({
    skip: 0,
    take: 50,
    orderBy: { title: 'desc' }
  })
})

it('given order=title:asc, should return as expected', async () => {
  const params = filter({ order: 'title:asc' })
  expect(params).toEqual({
    skip: 0,
    take: 50,
    orderBy: { title: 'asc' }
  })
})

it('given order=title:desc, should return as expected', async () => {
  const params = filter({ order: 'title:desc' })
  expect(params).toEqual({
    skip: 0,
    take: 50,
    orderBy: { title: 'desc' }
  })
})
