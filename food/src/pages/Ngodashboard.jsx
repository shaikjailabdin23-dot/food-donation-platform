import Layout from '../components/Layout'

const requests = [
  { id: 1, title: 'Family meal packs', quantity: '60 packs', urgent: true },
  { id: 2, title: 'Community kitchen support', quantity: '25 trays', urgent: false },
]

export default function NgoDashboard() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">NGO dashboard</p>
          <h1 className="mt-2 text-3xl font-bold text-slate-900">Coordinate incoming donations</h1>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {requests.map((request) => (
            <div key={request.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900">{request.title}</h2>
                {request.urgent ? (
                  <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-medium text-rose-700">Urgent</span>
                ) : (
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">Normal</span>
                )}
              </div>
              <p className="mt-4 text-sm text-slate-600">Needed: {request.quantity}</p>
              <button className="mt-6 rounded-full bg-emerald-600 px-4 py-2 font-semibold text-white transition hover:bg-emerald-700">Claim request</button>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}
