import { useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import Modal from '../components/Modal'
import { useAuth } from '../context/useAuth'

const quickLinks = [
  { title: 'Create donation', description: 'Share food surplus with nearby NGOs', to: '/donate' },
  { title: 'Browse donations', description: 'Find available food requests', to: '/available-donations' },
  { title: 'Notifications', description: 'Review updates and requests', to: '/notifications' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">Dashboard</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-50">Welcome back, {user?.name || 'there'}.</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Your role: <span className="font-semibold capitalize text-emerald-600 dark:text-emerald-400">{user?.role || 'donor'}</span></p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {quickLinks.map((item) => (
              <Link key={item.title} to={item.to} className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:border-emerald-500 dark:border-slate-800 dark:bg-slate-800/80 dark:hover:border-emerald-400">
                <h2 className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
              </Link>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={() => setOpen(true)} className="rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600">Open quick actions</button>
            <Link to="/profile" className="rounded-full border border-slate-300 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">View profile</Link>
          </div>
        </div>
      </section>

      <Modal open={open} title="Quick actions" onClose={() => setOpen(false)}>
        <div className="space-y-3">
          <Link to="/donate" className="block rounded-2xl bg-slate-50 p-4 font-semibold text-slate-900 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">Post a new donation</Link>
          <Link to="/my-donations" className="block rounded-2xl bg-slate-50 p-4 font-semibold text-slate-900 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">Review your donations</Link>
          <Link to="/settings" className="block rounded-2xl bg-slate-50 p-4 font-semibold text-slate-900 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">Adjust settings</Link>
        </div>
      </Modal>
    </Layout>
  )
}
