import { Card, CardContent } from './ui/card'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { Prisma } from '../generated/prisma'
import { format, isFuture } from 'date-fns'
import { ptBR } from 'date-fns/locale'

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
  const isConfirmed = isFuture(new Date(booking.date))

  return (
    <>
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
            <h3 className="font-semibold">{booking.barbershopService.name}</h3>

            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage
                  src={booking.barbershopService.barbershop.imageUrl}
                  alt="Avatar da barbearia"
                />
              </Avatar>
              <p className="text-sm">
                {booking.barbershopService.barbershop.name}
              </p>
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
    </>
  )
}

export default BookingItem
