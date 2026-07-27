import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

export default function NotFound() {
  return (
    <Layout>
      <section className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl transition dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">404</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900 dark:text-slate-50">Page not found</h1>
          <p className="mt-3 text-slate-600 dark:text-slate-300">The page you are looking for does not exist.</p>
          <Link to="/" className="mt-6 inline-flex rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600">Back home</Link>
        </div>
      </section>
    </Layout>
  )
}
