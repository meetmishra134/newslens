import { useState } from 'react'
import { useSignIn, useSignUp } from '@clerk/react'
import { motion } from 'motion/react'
import { Card, CardContent, CardHeader } from '#/components/ui/card'
import { Button } from '#/components/ui/button'
import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

const MotionCard = motion.create(Card)

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [flow, setFlow] = useState<'signIn' | 'signUp'>('signIn')
  const { signIn, fetchStatus: signInFetchStatus } = useSignIn()
  const { signUp, fetchStatus: signUpFetchStatus } = useSignUp()
  const navigate = useNavigate()
  const isLoading =
    signInFetchStatus === 'fetching' || signUpFetchStatus === 'fetching'

  // Google SSO Strategy
  const handleGoogleSignIn = async () => {
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
    }
  }

  const handleEmailSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault()

    if (flow === 'signIn') {
      const { error: createError } = await signIn.create({ identifier: email })

      if (createError) {
        if (createError.code === 'form_identifier_not_found') {
          setFlow('signUp')
          toast.error(
            'Account not found. Switched to Sign Up. Click Continue again.',
          )
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
    } else {
      const { error: createError } = await signUp.create({
        emailAddress: email,
      })

      if (createError) {
        toast.error(createError.message)
        return
      }

      const { error: sendCodeError } =
        await signUp.verifications.sendEmailCode()

      if (sendCodeError) {
        toast.error(sendCodeError.message)
      } else {
        setVerifying(true)
      }
    }
  }

  const handleCodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (flow === 'signIn') {
      const { error } = await signIn.emailCode.verifyCode({ code })

      if (error) {
        toast.error(error.message)
        return
      }

      if (signIn.status === 'complete') {
        await signIn.finalize()
        navigate({ to: '/onboarding' })
      }
    } else {
      const { error } = await signUp.verifications.verifyEmailCode({ code })

      if (error) {
        toast.error(error.message)
        return
      }

      if (signUp.status === 'complete') {
        await signUp.finalize()
        navigate({ to: '/onboarding' })
      }
    }
  }

  return (
    <MotionCard
      className="w-full max-w-md rounded-3xl border border-zinc-200/80 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
    >
      <CardHeader className="space-y-3 px-8 pt-8 text-center">
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
            {verifying
              ? 'Verify Code'
              : flow === 'signIn'
                ? 'Welcome back'
                : 'Create Account'}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-500">
            {verifying
              ? `We sent a code to ${email}`
              : flow === 'signIn'
                ? 'Sign in to continue to your personalized news feed.'
                : 'Sign up to get started with your personalized news feed.'}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 px-8 pt-6 pb-8">
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
              Continue with Google
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
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary h-11 w-full rounded-xl font-medium text-white transition-all hover:brightness-95"
              >
                {isLoading ? 'Sending code...' : 'Continue'}
              </Button>
            </form>

            <div className="text-center text-sm text-zinc-500">
              {flow === 'signIn' ? (
                <p>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setFlow('signUp')}
                    className="text-primary cursor-pointer font-semibold underline"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setFlow('signIn')}
                    className="text-primary cursor-pointer font-semibold underline"
                  >
                    Sign in
                  </button>
                </p>
              )}
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
              disabled={isLoading}
              className="bg-primary h-11 w-full rounded-xl font-medium text-white transition-all hover:brightness-95"
            >
              {isLoading ? 'Verifying...' : 'Verify & Continue'}
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

export default LoginForm
