'use client'

import { Card, CardContent } from './ui/card'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Prisma } from '../generated/prisma'
import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet'
import Image from 'next/image'
import PhoneItem from './phone-item'
import { Button } from './ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog'
import { deleteBooking } from '../_actions/delete-booking'
import { toast } from 'sonner'
import { useState } from 'react'
import BookingSummary from './booking-summary'

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      barbershopService: {
        include: { barbershop: true }
      }
    }
  }>
}

//TODO: receber agendamento como prop
const BookingItem = ({ booking }: BookingItemProps) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const isConfirmed = isFuture(new Date(booking.date))
  const {
    barbershopService: { barbershop },
  } = booking

  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id)
      setIsSheetOpen(false)
      toast.success('Reserva cancelada com sucesso!')
    } catch (error) {
      console.error('Erro ao cancelar reserva:', error)
      toast.error('Erro ao cancelar reserva. Tente novamente mais tarde.')
    }
  }

  const handleSheetOpenChange = (open: boolean) => {
    setIsSheetOpen(open)
  }

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger asChild>
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            {/* ESQUERDA */}
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge
                className="w-fit"
                variant={isConfirmed ? 'default' : 'secondary'}
              >
                {isConfirmed ? 'Confirmado' : 'Finalizado'}
              </Badge>
              <h3 className="font-semibold">
                {booking.barbershopService.name}
              </h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={barbershop.imageUrl}
                    alt="Avatar da barbearia"
                  />
                </Avatar>
                <p className="text-sm">{barbershop.name}</p>
              </div>
            </div>

            {/* DIREITA */}
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5 capitalize">
              <p className="text-sm">
                {format(booking.date, 'MMMM', { locale: ptBR })}
              </p>
              <p className="text-2xl">{format(booking.date, 'dd')}</p>
              <p className="text-sm">{format(booking.date, 'HH:mm')}</p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>

      <SheetContent className="w-[85%]">
        <SheetHeader>
          <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
        </SheetHeader>

        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <Image
            alt={`Mapa da barbearia ${barbershop.name}`}
            src="/images/map.png"
            layout="fill"
            objectFit="cover"
            className="rounded-xl object-cover"
          />

          <Card className="z-50 mx-5 my-3 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage
                  src={barbershop.imageUrl}
                  alt="Avatar da barbearia"
                />
              </Avatar>

              <div>
                <h3 className="font-semibold">{barbershop.name}</h3>
                <p className="text-xs">{barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6">
          <Badge
            className="w-fit"
            variant={isConfirmed ? 'default' : 'secondary'}
          >
            {isConfirmed ? 'Confirmado' : 'Finalizado'}
          </Badge>

          <div className="mb-3 mt-6">
            <BookingSummary
              barbershop={barbershop}
              service={booking.barbershopService}
              selectedDate={booking.date}
            />
          </div>

          <div className="space-y-3">
            {barbershop.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>
        </div>

        <SheetFooter className="mt-6">
          <div className="flex items-center gap-3">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Voltar
              </Button>
            </SheetClose>

            {isConfirmed && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    Cancelar Reserva
                  </Button>
                </DialogTrigger>

                <DialogContent className="w-[90%] rounded-xl">
                  <DialogHeader>
                    <DialogTitle>Você quer cancelar a sua reserva</DialogTitle>
                    <DialogDescription>
                      Tem certeza que deseja fazer o cancelamento? Esta ação é
                      irreversível
                    </DialogDescription>
                  </DialogHeader>

                  <DialogFooter className="flex flex-row gap-3">
                    <DialogClose asChild>
                      <Button variant="secondary" className="w-full">
                        Cancelar
                      </Button>
                    </DialogClose>

                    <Button
                      variant="destructive"
                      className="w-full"
                      onClick={handleCancelBooking}
                    >
                      Continuar
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default BookingItem
