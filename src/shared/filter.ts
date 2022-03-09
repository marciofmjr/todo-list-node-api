interface Params {
  q?: string
  limit?: number
  page?: number
  order?: string
}

export interface Filter {
  take: number
  skip: number
  orderBy: object
  where?: object
  include?: never
}

export default (params?: Params): Filter => {
  const filter: Filter = {
    skip: 0,
    take: 50,
    orderBy: { createdAt: 'desc' }
  }

  if (!params) {
    return filter
  }

  if (params.limit && params.limit > 0) {
    filter.take = parseInt('' + params.limit)
  }

  if (params.page && params.page !== 0 && params.page !== 1) {
    const index = +params.page - 1
    let skip = 0
    for (let i = 1; i <= index; i++) {
      skip += filter.take
    }
    filter.skip = skip
  }

  if (params.q) {
    filter.where = {}
    const props = params.q.split(',')

    for (const prop of props) {
      const data = prop.split(':')
      const name = data[0]
      const value = data[1]

      if (!name || !value) { continue }

      if (value.substring(1, 0) === '*' && value.slice(-1) === '*') { // Like *marcio*
        filter.where[name] = { contains: value.replace('*', '').replace('*', '') }
      } else if (value.substring(1, 0) === '*') { // Like *marcio
        filter.where[name] = { startsWith: value.replace('*', '') }
      } else if (value.slice(-1) === '*') { // Like marcio*
        filter.where[name] = { endsWith: value.replace('*', '') }
      } else if (value === 'true') {
        filter.where[name] = true
      } else if (value === 'false') {
        filter.where[name] = false
      } else {
        filter.where[name] = value
      }
    }
  }

  if (params.order) {
    const order = params.order.split(':')
    if (order.length === 1) {
      filter.orderBy = {}
      filter.orderBy[order[0]] = 'desc'
    } else if (order.length === 2) {
      filter.orderBy = {}
      filter.orderBy[order[0]] = order[1].toLocaleLowerCase()
    }
  }

  return filter
}
