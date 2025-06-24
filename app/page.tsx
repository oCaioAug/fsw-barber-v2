import { SearchIcon } from 'lucide-react'
import Header from './_components/header'
import { Button } from './_components/ui/button'
import { Input } from './_components/ui/input'
import Image from 'next/image'

export default function Home() {
  return (
    <div>
      {/* {header} */}
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Caio</h2>
        <p>Terça-feira, 24 de Junho.</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua busca aqui..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/images/banner-01.png"
            fill
            className="rounded-xl object-cover"
            alt="Agende nos melhores com FSW Barber"
          />
        </div>
      </div>
    </div>
  )
}
