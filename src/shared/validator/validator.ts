import { Schema } from 'joi'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validate = async (schema: Schema, data?: any): Promise<string> => {
  if (!data) data = {}
  try {
    await schema.validateAsync(data, { abortEarly: false })
    return Promise.resolve('ok')
  } catch (error) {
    const errors = []
    for (const detail of error.details) {
      errors.push(detail.message)
    }
    return Promise.resolve(errors.join(','))
  }
}

export default validate
