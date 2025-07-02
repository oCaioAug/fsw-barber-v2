'use server'

import { endOfDay, startOfDay } from 'date-fns'
import { db } from '../_lib/prisma'

interface GetBookingParams {
  serviceId: string
  date: Date
}

export const getBooking = ({ date }: GetBookingParams) => {
  return db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  })
}
