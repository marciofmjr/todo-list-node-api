import { Response } from 'express'

const responder = <T>(res: Response, status: number, data: T): Response<T> => {
  return res.status(status).json(data)
}

const OK = <T>(res: Response, data: T): Response<T> => {
  return responder(res, 200, data)
}

const CREATED = <T>(res: Response, data: T): Response<T> => {
  return responder(res, 201, data)
}

export default {
  OK,
  CREATED
}
