import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import LoadingSpinner from '../components/LoadingSpinner'
import api from '../services/api'

export default function Notifications() {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/donations/notifications')
      .then((response) => setNotifications(response.data))
      .finally(() => setLoading(false))
  }, [])

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Notifications</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Stay updated with the latest actions</h1>
          {loading ? <LoadingSpinner /> : <div className="mt-8 space-y-4">
            {notifications.length === 0 ? (
              <p className="rounded-2xl bg-slate-50 p-4 text-slate-600">You have no notifications yet.</p>
            ) : notifications.map((item) => (
              <div key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-700">
                <p>{item.message}</p>
                <time className="mt-2 block text-xs text-slate-500">{new Date(item.createdAt).toLocaleString()}</time>
              </div>
            ))}
          </div>}
        </div>
      </section>
    </Layout>
  )
}
