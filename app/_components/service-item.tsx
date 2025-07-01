'use client'

import Image from 'next/image'
import { Barbershop, BarbershopService } from '../generated/prisma'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import { Calendar } from './ui/calendar'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'
import { format, set } from 'date-fns'
import { createBooking } from '../_actions/create-booking'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

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

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  const handleDaySelect = (day: Date | undefined) => {
    setSelectedDay(day)
  }

  const handleTimeSelect = (time: string | undefined) => {
    setSelectedTime(time)
  }

  const handleSaveBooking = async () => {
    //1. Não exibir os horários que já foram agendados
    //2. Salvar o agendamento para o usuário logado
    if (!selectedDay || !selectedTime) {
      return
    }

    try {
      const hour = Number(selectedTime?.split(':')[0])
      const minute = Number(selectedTime?.split(':')[1])
      const newDate = set(selectedDay, {
        hours: hour,
        minutes: minute,
      })
      console.log(hour, minute, data)

      await createBooking({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        userId: (data?.user as any).id,
        barbershopServiceId: service.id,
        date: newDate,
      })
      toast.success('Reserva criada com sucesso!')
    } catch (error) {
      console.error('Error saving booking:', error)
      toast.error('Erro ao criar reserva. Tente novamente mais tarde.')

      return
    }
  }

  return (
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

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="secondary" size="sm">
                  Reservar
                </Button>
              </SheetTrigger>

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
                    {TIME_LIST.map((time) => (
                      <Button
                        key={time}
                        variant={selectedTime === time ? 'default' : 'outline'}
                        className="rounded-full"
                        onClick={() => handleTimeSelect(time)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                )}

                {selectedTime && selectedTime && (
                  <div className="p-5">
                    <Card>
                      <CardContent className="space-y-3 p-3">
                        <div className="flex items-center justify-between">
                          <h2 className="font-bold">{service.name}</h2>

                          <p className="text-sm font-bold">
                            {Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(Number(service.price))}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Data</h2>

                          <p className="text-sm">
                            {format(selectedDay!, "d 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Hora</h2>
                          <p className="text-sm">{selectedTime}</p>
                        </div>

                        <div className="flex items-center justify-between">
                          <h2 className="text-sm text-gray-400">Barbearia</h2>
                          <p className="text-sm">{barbershop.name}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <SheetFooter className="mt-5 px-5">
                  <SheetClose asChild>
                    <Button
                      type="submit"
                      onClick={() => handleSaveBooking()}
                      disabled={!selectedDay || !selectedTime}
                    >
                      Confirmar
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ServiceItem
