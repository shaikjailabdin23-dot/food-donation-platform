import Layout from '../components/Layout'

export default function Profile() {
  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Profile</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Manage your profile details</h1>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Name</p>
              <p className="mt-2 font-semibold text-slate-900">Ava Patel</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Email</p>
              <p className="mt-2 font-semibold text-slate-900">ava@example.com</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
