import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import SearchBar from '../components/SearchBar'
import LoadingSpinner from '../components/LoadingSpinner'
import api from '../services/api'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/useAuth'

const categories = ['All', 'Vegetables', 'Bakery', 'Meals', 'Packaged']

export default function AvailableDonations() {
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [acceptingId, setAcceptingId] = useState(null)
  const { user } = useAuth()
  const canAccept = ['admin', 'ngo'].includes(user?.role)

  useEffect(() => {
    const loadDonations = async () => {
      try {
        const response = await api.get('/donations')
        setDonations(response.data)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    loadDonations()
  }, [])

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch = `${donation.foodType} ${donation.pickupAddress}`.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'All' || donation.foodType?.includes(category) || donation.category?.includes(category)
    return matchesSearch && matchesCategory
  })

  const acceptDonation = async (id) => {
    try {
      setAcceptingId(id)
      const response = await api.patch(`/donations/${id}/accept`)
      setDonations((current) => current.map((donation) => donation.id === id ? response.data.donation : donation))
      toast.success('Donation accepted and confirmation email sent!')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to accept donation')
    } finally {
      setAcceptingId(null)
    }
  }

  return (
    <Layout>
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600 dark:text-emerald-400">Available donations</p>
            <h1 className="mt-3 text-3xl font-bold text-slate-900 dark:text-slate-50">Browse food rescue listings</h1>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <SearchBar value={search} onChange={setSearch} placeholder="Search by food or location" />
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
            >
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
        </div>

        {loading ? <LoadingSpinner /> : (
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredDonations.map((donation) => (
              <div key={donation.id} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">{donation.foodType || donation.category}</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">{donation.quantity}</h2>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">Pickup: {donation.pickupAddress || donation.location}</p>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Preferred time: {donation.pickupTime || 'Flexible'}</p>
                <p className="mt-2 text-sm font-medium capitalize text-emerald-700 dark:text-emerald-300">Status: {donation.status}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to={`/donations/${donation.id}`} state={{ donation }} className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600">View details</Link>
                  {canAccept && donation.status === 'pending' && (
                    <button
                      onClick={() => acceptDonation(donation.id)}
                      disabled={acceptingId === donation.id}
                      className="rounded-full border border-emerald-600 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 disabled:opacity-60 dark:border-emerald-500 dark:text-emerald-300 dark:hover:bg-emerald-950/60"
                    >
                      {acceptingId === donation.id ? 'Accepting...' : 'Accept donation'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  )
}
