import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

const requests = [
  { id: 1, title: 'Fresh vegetable boxes', location: 'Downtown', status: 'Pending pickup' },
  { id: 2, title: 'Bakery surplus', location: 'Northside', status: 'Scheduled' },
]

export default function DonorDashboard() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Donor dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900">Manage your food donations</h1>
          </div>
          <Link to="/donate" className="rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700">Create donation</Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Active listings</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">8</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Meals matched</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">142</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">Pickup success</p>
            <p className="mt-3 text-3xl font-bold text-slate-900">96%</p>
          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Recent donation activity</h2>
          <div className="mt-6 space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="flex flex-wrap items-center justify-between rounded-2xl bg-slate-50 p-4">
                <div>
                  <p className="font-semibold text-slate-900">{request.title}</p>
                  <p className="text-sm text-slate-600">{request.location}</p>
                </div>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-700">{request.status}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  )
}
