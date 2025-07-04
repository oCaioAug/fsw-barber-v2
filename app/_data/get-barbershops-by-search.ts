import { db } from '../_lib/prisma'

interface GetBarbershopsBySearchParams {
  title?: string
  service?: string
}

export const getBarbershopsBySearch = async (
  searchParams: GetBarbershopsBySearchParams,
) => {
  return db.barbershop.findMany({
    where: {
      OR: [
        searchParams.title
          ? {
              name: {
                contains: searchParams?.title,
                mode: 'insensitive',
              },
            }
          : {},
        searchParams.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams?.service,
                    mode: 'insensitive',
                  },
                },
              },
            }
          : {},
      ],
    },
  })
}
