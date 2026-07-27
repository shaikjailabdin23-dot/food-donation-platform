import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import Layout from '../components/Layout'
import api from '../services/api'
import { useAuth } from '../context/useAuth'
import { FiMail, FiLock, FiKey, FiArrowRight } from 'react-icons/fi'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [authMode, setAuthMode] = useState('otp') // 'otp' | 'password'
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  // OTP state
  const [otpEmail, setOtpEmail] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [countdown, setCountdown] = useState(0)

  const { register, handleSubmit, formState: { errors } } = useForm()

  useEffect(() => {
    let timer
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000)
    }
    return () => clearInterval(timer)
  }, [countdown])

  const onPasswordSubmit = async (data) => {
    setSubmitError('')
    try {
      setLoading(true)
      const response = await api.post('/auth/login', data)
      login({ ...response.data.user, token: response.data.token })
      toast.success('Signed in successfully')
      navigate('/dashboard')
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.'
      setSubmitError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setSubmitError('')
    if (!otpEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(otpEmail.trim())) {
      setSubmitError('Please enter a valid email address.')
      return
    }

    try {
      setLoading(true)
      const response = await api.post('/auth/send-otp', { email: otpEmail.trim() })
      setOtpSent(true)
      setCountdown(60)
      if (response.data.devNote) {
        toast.success(`OTP sent! (${response.data.devNote})`, { duration: 6000 })
      } else {
        toast.success('OTP sent to your email!')
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to send OTP. Please try again.'
      setSubmitError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setSubmitError('')
    if (!otpCode || otpCode.trim().length !== 6) {
      setSubmitError('Please enter a valid 6-digit OTP code.')
      return
    }

    try {
      setLoading(true)
      const response = await api.post('/auth/verify-otp', { email: otpEmail.trim(), otp: otpCode.trim() })
      login({ ...response.data.user, token: response.data.token })
      toast.success('Authenticated successfully with OTP!')
      navigate('/dashboard')
    } catch (error) {
      const msg = error.response?.data?.message || 'OTP verification failed.'
      setSubmitError(msg)
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <section className="mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition-colors dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">Welcome back</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50">Log in to FoodBridge</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Choose your preferred login method</p>

          {/* Mode Selector Tabs */}
          <div className="mt-6 flex rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => { setAuthMode('otp'); setSubmitError('') }}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition ${
                authMode === 'otp'
                  ? 'bg-white text-emerald-600 shadow-sm dark:bg-slate-900 dark:text-emerald-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <FiMail size={16} /> Email OTP
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('password'); setSubmitError('') }}
              className={`flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition ${
                authMode === 'password'
                  ? 'bg-white text-emerald-600 shadow-sm dark:bg-slate-900 dark:text-emerald-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              <FiLock size={16} /> Password
            </button>
          </div>

          {/* Email OTP Login Form */}
          {authMode === 'otp' && (
            <div className="mt-6 space-y-4">
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={otpEmail}
                      onChange={(e) => setOtpEmail(e.target.value)}
                      disabled={otpSent && countdown > 0}
                      className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-emerald-400"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {!otpSent ? (
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-70 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                  >
                    {loading ? 'Sending OTP...' : <>Send Login Code <FiArrowRight /></>}
                  </button>
                ) : (
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 px-1">
                    <span>OTP sent to {otpEmail}</span>
                    <button
                      type="submit"
                      disabled={loading || countdown > 0}
                      className="font-semibold text-emerald-600 hover:underline disabled:opacity-50 dark:text-emerald-400"
                    >
                      {countdown > 0 ? `Resend in ${countdown}s` : 'Resend OTP'}
                    </button>
                  </div>
                )}
              </form>

              {otpSent && (
                <form onSubmit={handleVerifyOtp} className="mt-4 space-y-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                      Enter 6-Digit Code
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength={6}
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="w-full tracking-widest text-center text-xl font-bold rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-300 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-600 dark:focus:border-emerald-400"
                        placeholder="123456"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-70 dark:bg-emerald-500 dark:hover:bg-emerald-600"
                  >
                    <FiKey size={18} /> {loading ? 'Verifying...' : 'Verify & Sign In'}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* Password Login Form */}
          {authMode === 'password' && (
            <form onSubmit={handleSubmit(onPasswordSubmit)} className="mt-6 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                <input
                  type="email"
                  autoComplete="email"
                  {...register('email', { required: 'Email is required', pattern: { value: /[^\s@]+@[^\s@]+\.[^\s@]+/, message: 'Enter a valid email' } })}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-emerald-400"
                  placeholder="you@example.com"
                />
                {errors.email && <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">{errors.email.message}</p>}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                <input
                  type="password"
                  {...register('password', { required: 'Password is required' })}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none transition focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-emerald-400"
                  placeholder="••••••••"
                />
                {errors.password && <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">{errors.password.message}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-70 dark:bg-emerald-500 dark:hover:bg-emerald-600"
              >
                {loading ? 'Signing in...' : 'Sign in with Password'}
              </button>
            </form>
          )}

          {submitError && (
            <p role="alert" className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 dark:border dark:border-rose-900">
              {submitError}
            </p>
          )}

          <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
            New here? <Link to="/register" className="font-semibold text-emerald-600 hover:underline dark:text-emerald-400">Create an account</Link>
          </p>
        </div>
      </section>
    </Layout>
  )
}
