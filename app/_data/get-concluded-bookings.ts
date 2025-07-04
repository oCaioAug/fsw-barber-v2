import { getServerSession } from 'next-auth'
import { authOptions } from '../_lib/auth'
import { db } from '../_lib/prisma'

export const getConcludedBookings = async () => {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return []
  }

  return db.booking.findMany({
    where: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      userId: (session?.user as any).id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      barbershopService: {
        include: { barbershop: true },
      },
    },
    orderBy: {
      date: 'desc',
    },
  })
}
