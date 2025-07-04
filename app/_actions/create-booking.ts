'use server'

import { revalidatePath } from 'next/cache'
import { db } from '../_lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '../_lib/auth'

interface CreateBookingParams {
  barbershopServiceId: string
  date: Date
}

export const createBooking = async (params: CreateBookingParams) => {
  const user = await getServerSession(authOptions)
  if (!user) {
    throw new Error('User not authenticated')
  }

  await db.booking.create({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: { ...params, userId: (user.user as any).id },
  })

  // Revalidate the barbershops layout to update all barbershop pages
  revalidatePath('/barbershops', 'layout')
  revalidatePath('/bookings')
}
