import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

export default function NotFound() {
  return (
    <Layout>
      <section className="mx-auto flex min-h-[70vh] max-w-3xl items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">404</p>
          <h1 className="mt-3 text-4xl font-bold text-slate-900">Page not found</h1>
          <p className="mt-3 text-slate-600">The page you are looking for does not exist.</p>
          <Link to="/" className="mt-6 inline-flex rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white">Back home</Link>
        </div>
      </section>
    </Layout>
  )
}
