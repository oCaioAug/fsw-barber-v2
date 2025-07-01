'use server'

import { db } from '../_lib/prisma'

interface CreateBookingParams {
  userId: string
  barbershopServiceId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  await db.booking.create({
    data: params,
  })
}
