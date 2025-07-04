'use client'

import { SearchIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormMessage } from './ui/form'

const formSchema = z.object({
  search: z.string().trim().min(1, {
    message: 'O campo de busca não pode estar vazio.',
  }),
})

const Search = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: '',
    },
  })

  const router = useRouter()

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    router.push(`/barbershops?title=${data.search}`)
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex gap-2">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Faça sua busca aqui..." {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          ></FormField>

          <Button type="submit">
            <SearchIcon />
          </Button>
        </form>
      </Form>
    </>
  )
}

export default Search
