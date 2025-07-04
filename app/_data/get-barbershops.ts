import { db } from '../_lib/prisma'

export const getBarbershops = async () => {
  return db.barbershop.findMany({})
}
