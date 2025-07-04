import { db } from '../_lib/prisma'

export const getBarbershopById = async (id: string) => {
  return db.barbershop.findUnique({
    where: {
      id,
    },
    include: {
      services: true,
    },
  })
}
