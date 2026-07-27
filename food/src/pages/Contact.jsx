import Layout from '../components/Layout'

export default function Contact() {
  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">Contact</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900 dark:text-slate-50">Let’s build a better food rescue network.</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-300">Reach out to discuss partnership, support, or platform access.</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-6 dark:bg-slate-800/80">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100">Email</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">hello@foodbridge.org</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-6 dark:bg-slate-800/80">
              <h2 className="font-semibold text-slate-900 dark:text-slate-100">Phone</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">+91 98765 43210</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
