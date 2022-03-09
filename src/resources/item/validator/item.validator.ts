/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from 'joi'
import validator from '@shared/validator'

const schema = Joi.object({
  title: Joi.string().required().max(100)
})

export default async <T>(data?: T): Promise<string> => {
  if (data === undefined) return validator(schema, {})
  return validator(schema, data)
}
