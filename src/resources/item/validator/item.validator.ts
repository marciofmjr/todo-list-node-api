/* eslint-disable @typescript-eslint/no-explicit-any */
import Joi from 'joi'
import validator from '@shared/validator/validator'

const schema = Joi.object({
  title: Joi.string().required()
})

export default async (data?: any): Promise<string> => {
  if (data === undefined) data = {}
  return validator(schema, data)
}
