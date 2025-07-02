import Image from 'next/image'
import { Button } from './ui/button'
import { DialogDescription, DialogHeader, DialogTitle } from './ui/dialog'
import { signIn } from 'next-auth/react'

const SignInDialog = () => {
  const handleLoginWithGoogleClick = () => signIn('google')

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-left">
          Faça login na Plataforma
        </DialogTitle>
        <DialogDescription className="text-left">
          <div className="flex flex-col gap-4">
            <Button
              variant="outline"
              className="gap-2 font-bold"
              onClick={handleLoginWithGoogleClick}
            >
              <Image
                src="/icons/google.svg"
                alt="Google Icon"
                height={18}
                width={18}
              />
              Google
            </Button>
          </div>
        </DialogDescription>
      </DialogHeader>
    </>
  )
}

export default SignInDialog
