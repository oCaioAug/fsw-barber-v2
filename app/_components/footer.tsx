import { Card, CardContent } from './ui/card'

const Footer = () => {
  return (
    <footer>
      <Card className="">
        <CardContent className="px-5 py-6">
          <p className="text-sm text-gray-400">
            ©2025 Copyright <span className="text-bold">FSW Barber</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
