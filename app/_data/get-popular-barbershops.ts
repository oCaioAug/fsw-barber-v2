import { db } from '../_lib/prisma'

export const getPopularBarbershops = async () => {
  return db.barbershop.findMany({
    orderBy: {
      name: 'desc', // TODO: Change this to a more meaningful order, like by rating or number of bookings
    },
  })
}
