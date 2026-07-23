import Layout from '../components/Layout'

export default function Settings() {
  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Settings</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Update your preferences</h1>
          <div className="mt-8 space-y-4">
            <div className="rounded-2xl border border-slate-200 p-4">Dark mode</div>
            <div className="rounded-2xl border border-slate-200 p-4">Email notifications</div>
            <div className="rounded-2xl border border-slate-200 p-4">Location sharing</div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
