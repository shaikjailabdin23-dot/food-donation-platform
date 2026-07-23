import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import Layout from '../components/Layout'
import api from '../services/api'
import { useAuth } from '../context/useAuth'

export default function Register() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [loading, setLoading] = useState(false)
  const { register: registerField, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await api.post('/auth/register', data)
      login({ ...response.data.user, token: response.data.token })
      toast.success('Account created successfully')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <section className="mx-auto flex min-h-[80vh] max-w-5xl items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Create account</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Register to start donating</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Full name</label>
              <input {...registerField('name', { required: 'Name is required' })} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500" placeholder="Ava Patel" />
              {errors.name && <p className="mt-1 text-sm text-rose-600">{errors.name.message}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
              <input type="email" autoComplete="email" {...registerField('email', { required: 'Email is required', pattern: { value: /[^\s@]+@[^\s@]+\.[^\s@]+/, message: 'Enter a valid email' } })} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500" placeholder="ava@email.com" />
              {errors.email && <p className="mt-1 text-sm text-rose-600">{errors.email.message}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
              <input type="password" {...registerField('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500" placeholder="••••••••" />
              {errors.password && <p className="mt-1 text-sm text-rose-600">{errors.password.message}</p>}
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Role</label>
              <select {...registerField('role')} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500">
                <option value="donor">Donor</option>
                <option value="ngo">NGO</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <button type="submit" disabled={loading} className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-70">
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>
          <p className="mt-6 text-center text-sm text-slate-600">
            Already have an account? <Link to="/login" className="font-semibold text-emerald-600">Sign in</Link>
          </p>
        </div>
      </section>
    </Layout>
  )
}
