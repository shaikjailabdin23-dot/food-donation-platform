import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Layout from '../components/Layout'
import api from '../services/api'

export default function Donate() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [submitError, setSubmitError] = useState('')
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data) => {
    setSubmitError('')
    try {
      setLoading(true)
      const response = await api.post('/donations', data)
      const qrPayload = `FoodBridge donation\nID: ${response.data.id}\nFood: ${response.data.foodType}\nQuantity: ${response.data.quantity}\nPickup: ${response.data.pickupAddress}\nTime: ${response.data.pickupTime}`
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(qrPayload)}`)
      toast.success('Donation submitted! Admin and nearby NGOs have been notified.')
      reset()
    } catch (error) {
      console.error('Donation submission error:', error)
      const isAuthError = error.response?.status === 401
      const message = isAuthError
        ? 'Your login session expired or is invalid. Please sign in again.'
        : error.response?.data?.message || 'Unable to submit donation. Please verify your connection.'
      
      setSubmitError(message)
      toast.error(message)

      if (isAuthError) {
        setTimeout(() => navigate('/login'), 1500)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">Donate food</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-50">Share surplus food with your community</h1>
          
          {submitError && (
            <div role="alert" className="mt-6 rounded-2xl bg-rose-50 p-4 text-sm font-medium text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 dark:border dark:border-rose-900">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Food category</label>
                <input
                  {...register('category', { required: 'Food category is required' })}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-emerald-400"
                  placeholder="Vegetables, rice, bakery items"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Quantity</label>
                <input
                  {...register('quantity', { required: 'Quantity is required' })}
                  className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-emerald-400"
                  placeholder="20 boxes / 50 meals"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Pickup address</label>
              <input
                {...register('pickupAddress', { required: 'Pickup address is required' })}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-emerald-400"
                placeholder="123 Community Market Street"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Preferred pickup time</label>
              <input
                {...register('pickupTime')}
                className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-emerald-400"
                placeholder="Today before 6:00 PM"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Notes / Dietary Info</label>
              <textarea
                {...register('notes')}
                className="min-h-28 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 outline-none focus:border-emerald-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder-slate-500 dark:focus:border-emerald-400"
                placeholder="Freshly prepared vegetarian meals..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-70 dark:bg-emerald-500 dark:hover:bg-emerald-600"
            >
              {loading ? 'Submitting donation...' : 'Submit donation'}
            </button>
          </form>
          {qrCodeUrl && (
            <div className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-center dark:border-emerald-900 dark:bg-emerald-950/40">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Donation QR code</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Scan this code to view the donation and pickup information.</p>
              <img src={qrCodeUrl} alt="QR code containing donation details" className="mx-auto mt-4 h-60 w-60 rounded-xl bg-white p-2" />
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}
