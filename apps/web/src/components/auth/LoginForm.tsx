import { useState } from 'react'
import { useSignIn } from '@clerk/react'
import { motion } from 'motion/react'
import { Card, CardContent, CardHeader } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { useNavigate, Link } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Spinner } from '#/components/ui/spinner'
import { checkUser } from '#/features/auth/api/checkUser'

const MotionCard = motion.create(Card)

export const SignInForm = () => {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [isError, setIsError] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isEmailLoading, setIsEmailLoading] = useState(false)
  const { signIn } = useSignIn()
  const navigate = useNavigate()

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true)
    try {
      const { error } = await signIn.sso({
        strategy: 'oauth_google',
        redirectUrl: '/onboarding',
        redirectCallbackUrl: '/sso-callback',
      })

      if (error) {
        toast.error(error.message)
      }
    } catch {
      toast.error('Google Sign-In failed.')
    } finally {
      setIsGoogleLoading(false)
    }
  }

  const handleEmailSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (email.length === 0) {
      setIsError('Email address is required.')
      return
    }

    setIsEmailLoading(true)
    try {
      const { exists } = await checkUser({ email })
      if (!exists) {
        toast.error('Account not found.')
        setIsEmailLoading(false)
        return
      }
      const { error: createError } = await signIn.create({ identifier: email })

      if (createError) {
        if (createError.code === 'form_identifier_not_found') {
          toast.error('Account not found. Please sign up first.')
          return
        }
        toast.error(createError.message)
        return
      }

      const { error: sendCodeError } = await signIn.emailCode.sendCode()

      if (sendCodeError) {
        toast.error(sendCodeError.message)
      } else {
        setVerifying(true)
      }
    } catch {
      toast.error('An unexpected error occurred.')
    } finally {
      setIsEmailLoading(false)
    }
  }

  const handleCodeSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!code) {
      setIsError('Please enter the verification code.')
      return
    }

    setIsEmailLoading(true)
    try {
      const { error } = await signIn.emailCode.verifyCode({ code })

      if (error) {
        toast.error(error.message)
        return
      }

      if (signIn.status === 'complete') {
        await signIn.finalize()
        navigate({ to: '/onboarding' })
      }
    } catch {
      toast.error('Verification failed.')
    } finally {
      setIsEmailLoading(false)
    }
  }

  return (
    <MotionCard
      className="shadow-input w-full max-w-sm rounded-3xl border border-zinc-200/80 bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <CardHeader className="space-y-2 px-7 pt-6 pb-0 text-center">
        <div className="flex flex-col items-center">
          <motion.img
            src="/images/newslens.svg"
            alt="NewsLens"
            className="h-11 w-11 shadow-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0, rotate: 360 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          />
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            {verifying ? 'Verify Code' : 'Welcome back'}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            {verifying
              ? `We sent a code to ${email}`
              : 'Sign in to continue to your personalized news feed.'}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-7 pt-4 pb-6">
        {!verifying ? (
          <>
            <Button
              variant="outline"
              onClick={handleGoogleSignIn}
              type="button"
              className="h-11 w-full cursor-pointer rounded-xl border-zinc-200 font-medium text-zinc-700 transition-all hover:border-zinc-300 hover:bg-zinc-50"
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              {isGoogleLoading ? (
                <>
                  <Spinner data-icon="inline-start" />
                </>
              ) : (
                'Sign in with Google'
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-zinc-300" />
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-xs tracking-wider text-zinc-400 uppercase">
                  or
                </span>
              </div>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="focus-visible:ring-primary shadow-input h-11 rounded-xl border-zinc-200"
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setIsError('')
                  }}
                  onInvalid={(e) => {
                    e.preventDefault()
                    setIsError('Please enter a valid email address.')
                  }}
                  value={email}
                />
                {isError && (
                  <p className="text-primary mt-1 text-sm">{isError}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isEmailLoading}
                className="bg-primary h-11 w-full rounded-xl font-medium text-white transition-all hover:brightness-95"
              >
                {isEmailLoading ? (
                  <>
                    <Spinner data-icon="inline-start" />
                    Sending code...
                  </>
                ) : (
                  'Continue'
                )}
              </Button>
            </form>

            <div className="text-center text-sm text-zinc-500">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-primary cursor-pointer font-semibold underline"
              >
                Sign up
              </Link>
            </div>
          </>
        ) : (
          <form onSubmit={handleCodeSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="code" className="text-sm font-medium">
                Verification code
              </Label>
              <Input
                id="code"
                type="text"
                placeholder="123456"
                className="focus-visible:ring-primary h-11 rounded-xl border-zinc-200 text-center text-lg tracking-widest"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isEmailLoading}
              className="bg-primary h-11 w-full rounded-xl font-medium text-white transition-all hover:brightness-95"
            >
              {isEmailLoading ? 'Verifying...' : 'Verify & Continue'}
            </Button>

            <button
              type="button"
              onClick={() => setVerifying(false)}
              className="w-full cursor-pointer text-center text-xs text-zinc-500 hover:underline"
            >
              ← Back
            </button>
          </form>
        )}
      </CardContent>
    </MotionCard>
  )
}

export default SignInForm
