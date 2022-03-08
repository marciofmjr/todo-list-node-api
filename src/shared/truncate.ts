import database from '@core/database'

export default async () => {
  await database.item.deleteMany()
}
