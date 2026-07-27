import Layout from '../components/Layout'
import { useTheme } from '../context/ThemeContext'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function Settings() {
  const { theme, toggleTheme } = useTheme()

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl transition dark:border-slate-800 dark:bg-slate-900">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">Settings</p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-50">Update your preferences</h1>
          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-5 transition dark:border-slate-800 dark:bg-slate-800/80">
              <div>
                <p className="font-semibold text-slate-900 dark:text-slate-100">Appearance Theme</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Current theme: <span className="capitalize font-medium text-emerald-600 dark:text-emerald-400">{theme} mode</span></p>
              </div>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600"
              >
                {theme === 'dark' ? <><FiSun size={18} /> Switch to Light</> : <><FiMoon size={18} /> Switch to Dark</>}
              </button>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/80">
              <p className="font-semibold text-slate-900 dark:text-slate-100">Email Notifications</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Receive email alerts on donation updates and claim statuses.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-800/80">
              <p className="font-semibold text-slate-900 dark:text-slate-100">Location Sharing</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">Share default pickup area for faster matching with nearby NGOs.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
