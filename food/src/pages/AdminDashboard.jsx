import Layout from '../components/Layout'

const metrics = [
  { label: 'Pending approvals', value: '14' },
  { label: 'Verified NGOs', value: '78' },
  { label: 'Total donations', value: '3.2k' },
]

export default function AdminDashboard() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">Admin dashboard</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50">Keep the platform reliable and fair</h1>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition dark:border-slate-800 dark:bg-slate-900">
              <p className="text-sm text-slate-500 dark:text-slate-400">{metric.label}</p>
              <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-100">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Moderation queue</h2>
          <ul className="mt-6 space-y-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/80">New donation request from Green Table Cafe needs approval.</li>
            <li className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/80">NGO verification documents submitted for review.</li>
            <li className="rounded-2xl bg-slate-50 p-4 dark:bg-slate-800/80">System alert: 3 pickups are overdue.</li>
          </ul>
        </div>
      </section>
    </Layout>
  )
}
