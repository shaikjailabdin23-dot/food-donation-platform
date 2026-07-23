import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import Layout from '../components/Layout'
import api from '../services/api'
import { useAuth } from '../context/useAuth'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    setSubmitError('')
    try {
      setLoading(true)
      const response = await api.post('/auth/login', data)
      login({ ...response.data.user, token: response.data.token })
      toast.success('Signed in successfully')
      navigate('/dashboard')
    } catch (error) {
      const isInvalidCredentials = error.response?.status === 400 && error.response?.data?.message === 'Invalid credentials'
      const message = isInvalidCredentials
        ? 'The email or password is incorrect. If you are new, please create an account first.'
        : error.response?.data?.message || 'Login failed. Check that the backend server is running.'
      setSubmitError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <section className="mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Welcome back</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Log in to continue</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input type="email" autoComplete="email" {...register('email', { required: 'Email is required', pattern: { value: /[^\s@]+@[^\s@]+\.[^\s@]+/, message: 'Enter a valid email address' } })} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500" placeholder="you@example.com" />
              {errors.email && <p className="mt-1 text-sm text-rose-600">{errors.email.message}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input type="password" {...register('password', { required: 'Password is required' })} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500" placeholder="••••••••" />
              {errors.password && <p className="mt-1 text-sm text-rose-600">{errors.password.message}</p>}
            </div>
            <button type="submit" disabled={loading} className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-70">
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
            {submitError && (
              <p role="alert" className="rounded-xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                {submitError}
              </p>
            )}
          </form>
          <p className="mt-6 text-center text-sm text-slate-600">
            New here? <Link to="/register" className="font-semibold text-emerald-600">Create an account</Link>
          </p>
        </div>
      </section>
    </Layout>
  )
}
