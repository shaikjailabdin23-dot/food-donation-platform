import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import Layout from '../components/Layout'
import api from '../services/api'

export default function Donate() {
  const [loading, setLoading] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data) => {
    try {
      setLoading(true)
      const response = await api.post('/donations', data)
      const qrPayload = `FoodBridge donation\nID: ${response.data.id}\nFood: ${response.data.foodType}\nQuantity: ${response.data.quantity}\nPickup: ${response.data.pickupAddress}\nTime: ${response.data.pickupTime}`
      setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=${encodeURIComponent(qrPayload)}`)
      toast.success('Donation posted successfully')
      reset()
    } catch {
      toast.error('Unable to post donation')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Donate food</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Share surplus food with your community</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Food category</label>
                <input {...register('category', { required: 'Food category is required' })} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500" placeholder="Vegetables, rice, bread" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Quantity</label>
                <input {...register('quantity', { required: 'Quantity is required' })} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500" placeholder="20 boxes" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Pickup address</label>
              <input {...register('pickupAddress', { required: 'Pickup address is required' })} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500" placeholder="123 Market Street" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Preferred pickup time</label>
              <input {...register('pickupTime')} className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500" placeholder="Today, 6:00 PM" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Notes</label>
              <textarea {...register('notes')} className="min-h-28 w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-emerald-500" placeholder="Any special instructions?" />
            </div>
            <button type="submit" disabled={loading} className="w-full rounded-2xl bg-emerald-600 px-4 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-70">
              {loading ? 'Submitting...' : 'Submit donation'}
            </button>
          </form>
          {qrCodeUrl && (
            <div className="mt-8 rounded-3xl border border-emerald-200 bg-emerald-50 p-6 text-center">
              <h2 className="text-xl font-semibold text-slate-900">Donation QR code</h2>
              <p className="mt-2 text-sm text-slate-600">Scan this code to view the donation and pickup information.</p>
              <img src={qrCodeUrl} alt="QR code containing donation details" className="mx-auto mt-4 h-60 w-60 rounded-xl bg-white p-2" />
            </div>
          )}
        </div>
      </section>
    </Layout>
  )
}
