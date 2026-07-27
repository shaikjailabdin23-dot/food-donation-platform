import Layout from '../components/Layout'
import { useAuth } from '../context/useAuth'

export default function Profile() {
  const { user } = useAuth()

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">Profile</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-50">Manage your profile details</h1>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/80">
              <p className="text-sm text-slate-500 dark:text-slate-400">Name</p>
              <p className="mt-2 font-semibold text-slate-900 dark:text-slate-100">{user?.name || 'Guest User'}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/80">
              <p className="text-sm text-slate-500 dark:text-slate-400">Email</p>
              <p className="mt-2 font-semibold text-slate-900 dark:text-slate-100">{user?.email || 'N/A'}</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-800/80">
              <p className="text-sm text-slate-500 dark:text-slate-400">Account Role</p>
              <p className="mt-2 font-semibold capitalize text-emerald-600 dark:text-emerald-400">{user?.role || 'donor'}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
