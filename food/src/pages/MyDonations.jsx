import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import LoadingSpinner from '../components/LoadingSpinner'
import api from '../services/api'

export default function MyDonations() {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/donations/mine')
      .then((response) => setDonations(response.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Layout>
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">My donations</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Track what you have shared</h1>
          {loading ? <LoadingSpinner /> : <div className="mt-8 space-y-4">
            {donations.length === 0 ? (
              <p className="rounded-2xl bg-slate-50 p-4 text-slate-600">You have not posted any donations yet.</p>
            ) : donations.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <span className="font-semibold text-slate-900">{item.foodType} — {item.quantity}</span>
                <span className="text-sm text-slate-600">{item.status}</span>
              </div>
            ))}
          </div>}
        </div>
      </section>
    </Layout>
  )
}
