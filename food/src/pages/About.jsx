import Layout from '../components/Layout'

export default function About() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">About us</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-50">We connect surplus food with the people who need it most.</h1>
            <p className="mt-6 text-lg text-slate-600 dark:text-slate-300">FoodBridge brings together restaurants, hotels, event organizers, and NGOs through a transparent and reliable marketplace for food redistribution.</p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Our mission</h2>
            <ul className="mt-6 space-y-4 text-slate-600 dark:text-slate-300">
              <li>• Reduce food waste across the supply chain.</li>
              <li>• Ensure safe and verified food handoff to NGOs.</li>
              <li>• Build trust through transparent listings and tracking.</li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  )
}
