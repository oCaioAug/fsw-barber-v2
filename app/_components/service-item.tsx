'use client'

import Image from 'next/image'
import { Barbershop, BarbershopService, Booking } from '../generated/prisma'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from './ui/sheet'
import { Calendar } from './ui/calendar'
import { ptBR } from 'date-fns/locale'
import { useEffect, useMemo, useState } from 'react'
import { isPast, isToday, set } from 'date-fns'
import { createBooking } from '../_actions/create-booking'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { getBooking } from '../_actions/get-booking'
import { Dialog, DialogContent } from './ui/dialog'
import SignInDialog from './sign-in-dialog'
import BookingSummary from './booking-summary'
import { useRouter } from 'next/navigation'

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, 'name'>
}

const TIME_LIST = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
]

interface GetTimeListProps {
  bookings: Booking[]
  selectedDay: Date
}

const getTimeList = ({ bookings, selectedDay }: GetTimeListProps) => {
  //TODO: Não exibir os horários no passado
  return TIME_LIST.filter((time) => {
    const hour = Number(time.split(':')[0])
    const minute = Number(time.split(':')[1])

    const timeIsOnThePast = isPast(
      set(new Date(), { hours: hour, minutes: minute }),
    )

    if (timeIsOnThePast && isToday(selectedDay)) {
      return false
    }

    const hasBookingsOnCurrentTime = bookings.some(
      (booking) =>
        booking.date.getHours() == hour && booking.date.getMinutes() == minute,
    )

    if (hasBookingsOnCurrentTime) {
      return false
    }

    return true
  })
}

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession()
  const router = useRouter()
  const [sigInDialogIsOpen, setSignInDialogIsOpen] = useState(false)
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )
  const [dayBookings, setDayBookings] = useState<Booking[]>([])
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) {
        return
      }

      const bookings = await getBooking({
        date: selectedDay,
        serviceId: service.id,
      })

      setDayBookings(bookings)
    }

    fetch()
  }, [selectedDay, service.id])

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined)
    setSelectedTime(undefined)
    setDayBookings([])
    setBookingSheetIsOpen((prev) => !prev)
  }

  const selectedDate = useMemo(() => {
    if (!selectedDay || !selectedTime) return

    return set(selectedDay, {
      hours: Number(selectedTime?.split(':')[0]),
      minutes: Number(selectedTime?.split(':')[1]),
    })
  }, [selectedDay, selectedTime])

  const handleBookingClick = () => {
    if (data?.user) {
      return setBookingSheetIsOpen(true)
    }

    return setSignInDialogIsOpen(true)
  }

  const handleDaySelect = (day: Date | undefined) => {
    setSelectedDay(day)
  }

  const handleTimeSelect = (time: string | undefined) => {
    setSelectedTime(time)
  }

  const handleCreateBooking = async () => {
    //1. Não exibir os horários que já foram agendados
    //2. Salvar o agendamento para o usuário logado
    try {
      if (!selectedDate) return

      await createBooking({
        barbershopServiceId: service.id,
        date: selectedDate,
      })

      handleBookingSheetOpenChange()
      toast.success('Reserva criada com sucesso!', {
        action: {
          label: 'Ver agendamentos',
          onClick: () => router.push('/bookings'),
        },
      })
    } catch (error) {
      console.error('Error saving booking:', error)
      toast.error('Erro ao criar reserva. Tente novamente mais tarde.')

      return
    }
  }

  const timeList = useMemo(() => {
    if (!selectedDay) {
      return []
    }

    return getTimeList({
      bookings: dayBookings,
      selectedDay,
    })
  }, [dayBookings, selectedDay])

  return (
    <>
      <Card>
        <CardContent className="flex items-center gap-3 p-3">
          {/* IMAGEM */}
          <div className="relative max-h-[110px] min-h-[110px] min-w-[110px] max-w-[110px] rounded-lg">
            <Image
              src={service.imageUrl}
              fill
              className="rounded-lg object-cover"
              alt={service.name}
            />
          </div>

          {/* DIREITA */}
          <div className="w-full space-y-2">
            <h3 className="text-sm font-semibold">{service.name}</h3>
            <p className="text-sm text-gray-400">{service.description}</p>

            {/* PREÇO E BOTÃO */}
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold text-primary">
                {Intl.NumberFormat('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                }).format(Number(service.price))}
              </p>

              <Sheet
                open={bookingSheetIsOpen}
                onOpenChange={handleBookingSheetOpenChange}
              >
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleBookingClick}
                >
                  Reservar
                </Button>

                <SheetContent className="px-0">
                  <SheetHeader>
                    <SheetTitle>Fazer Reserva</SheetTitle>
                  </SheetHeader>

                  <div className="border-b border-solid py-5">
                    <Calendar
                      mode="single"
                      locale={ptBR}
                      selected={selectedDay}
                      onSelect={handleDaySelect}
                      hidden={{ before: new Date() }}
                      styles={{
                        month_caption: {
                          width: '100%',
                          textTransform: 'capitalize',
                        },
                        root: {
                          width: '100%',
                        },
                      }}
                    />
                  </div>

                  {selectedDay && (
                    <div className="flex gap-3 overflow-x-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                      {timeList.length > 0 ? (
                        timeList.map((time) => (
                          <Button
                            key={time}
                            variant={
                              selectedTime === time ? 'default' : 'outline'
                            }
                            className="rounded-full"
                            onClick={() => handleTimeSelect(time)}
                          >
                            {time}
                          </Button>
                        ))
                      ) : (
                        <p className="text-xs">
                          Não há horários disponíveis para este dia
                        </p>
                      )}
                    </div>
                  )}

                  {selectedDate && (
                    <div className="p-5">
                      <BookingSummary
                        service={service}
                        barbershop={barbershop}
                        selectedDate={selectedDate}
                      />
                    </div>
                  )}

                  <SheetFooter className="mt-5 px-5">
                    <Button
                      type="submit"
                      onClick={() => handleCreateBooking()}
                      disabled={!selectedDate}
                    >
                      Confirmar
                    </Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog
        open={sigInDialogIsOpen}
        onOpenChange={(open) => setSignInDialogIsOpen(open)}
      >
        <DialogContent className="w-[90%] sm:w-[400px]">
          <SignInDialog />
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ServiceItem
