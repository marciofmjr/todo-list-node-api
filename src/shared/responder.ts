/* eslint-disable @typescript-eslint/no-explicit-any */
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

const BAD_REQUEST = <T>(res: Response, data: T): Response<T> => {
  return responder(res, 400, data)
}

const UNAUTHORIZED = <T>(res: Response, data: T): Response<T> => {
  return responder(res, 401, data)
}

const FORBIDDEN = <T>(res: Response, data: T): Response<T> => {
  return responder(res, 403, data)
}

const NOT_FOUND = <T>(res: Response, data: T): Response<T> => {
  return responder(res, 404, data)
}

const UNPROCESSABLE_ENTITY = <T>(res: Response, data: T): Response<T> => {
  return responder(res, 422, data)
}

const INTERNAL_SERVER_ERROR = (res: Response, data: any): Response<any> => {
  if (data?.message) {
    return responder(res, 500, data.message)
  }
  return responder(res, 500, data)
}

export default {
  OK,
  CREATED,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  UNPROCESSABLE_ENTITY,
  INTERNAL_SERVER_ERROR
}
