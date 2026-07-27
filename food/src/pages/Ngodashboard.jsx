import Layout from '../components/Layout'

const requests = [
  { id: 1, title: 'Family meal packs', quantity: '60 packs', urgent: true },
  { id: 2, title: 'Community kitchen support', quantity: '25 trays', urgent: false },
]

export default function NgoDashboard() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">NGO dashboard</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-50">Coordinate incoming donations</h1>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {requests.map((request) => (
            <div key={request.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{request.title}</h2>
                {request.urgent ? (
                  <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-800 dark:bg-rose-950 dark:text-rose-300">Urgent</span>
                ) : (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">Normal</span>
                )}
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">Needed: {request.quantity}</p>
              <button className="mt-6 rounded-full bg-emerald-600 px-4 py-2 font-semibold text-white transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600">Claim request</button>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}
