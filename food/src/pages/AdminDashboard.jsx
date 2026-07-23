import Layout from '../components/Layout'

const metrics = [
  { label: 'Pending approvals', value: '14' },
  { label: 'Verified NGOs', value: '78' },
  { label: 'Total donations', value: '3.2k' },
]

export default function AdminDashboard() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Admin dashboard</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Keep the platform reliable and fair</h1>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">{metric.label}</p>
              <p className="mt-3 text-3xl font-bold text-slate-900">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-900">Moderation queue</h2>
          <ul className="mt-6 space-y-3 text-sm text-slate-600">
            <li className="rounded-2xl bg-slate-50 p-4">New donation request from Green Table Cafe needs approval.</li>
            <li className="rounded-2xl bg-slate-50 p-4">NGO verification documents submitted for review.</li>
            <li className="rounded-2xl bg-slate-50 p-4">System alert: 3 pickups are overdue.</li>
          </ul>
        </div>
      </section>
    </Layout>
  )
}
