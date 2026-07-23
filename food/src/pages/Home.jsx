import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiHeart, FiMapPin, FiShield } from 'react-icons/fi'
import Layout from '../components/Layout'

const features = [
  { icon: FiHeart, title: 'Reduce waste', text: 'Rescue surplus food before it goes to landfill.' },
  { icon: FiMapPin, title: 'Local impact', text: 'Connect with nearby NGOs and community kitchens.' },
  { icon: FiShield, title: 'Verified partners', text: 'Build trust through transparent donation workflows.' },
]

export default function Home() {
  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
            <p className="mb-4 inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">Food rescue made simple</p>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-6xl">Turn surplus meals into hope for the people who need them most.</h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-600">FoodBridge helps donors, NGOs, and community organizers coordinate food rescue efficiently and responsibly.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/register" className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-emerald-700">Get started <FiArrowRight /></Link>
              <Link to="/available-donations" className="rounded-full border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600">Browse donations</Link>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
            <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-lime-500 p-8 text-white">
              <p className="text-sm uppercase tracking-[0.3em]">Live impact</p>
              <p className="mt-3 text-3xl font-semibold">12k+ meals shared this month</p>
              <p className="mt-4 text-sm text-emerald-50">Trusted by restaurants, hotels, organizers, and NGOs across the city.</p>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {['320 NGOs', '1.8k donors', '97% pickup success'].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-50 p-4 text-center text-sm font-medium text-slate-700">{item}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="inline-flex rounded-2xl bg-emerald-100 p-3 text-emerald-600"><Icon size={22} /></div>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-slate-600">{feature.text}</p>
              </div>
            )
          })}
        </div>
      </section>
    </Layout>
  )
}
