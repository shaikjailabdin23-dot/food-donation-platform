import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Layout from '../components/Layout'
import LoadingSpinner from '../components/LoadingSpinner'
import api from '../services/api'

export default function DonationDetails() {
  const { id } = useParams()
  const [donation, setDonation] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get(`/donations/${id}`)
      .then((response) => setDonation(response.data))
      .catch((requestError) => setError(requestError.response?.data?.message || 'Unable to load donation details.'))
  }, [id])

  return (
    <Layout>
      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Donation details</p>
          {!donation && !error && <LoadingSpinner />}
          {error && <p role="alert" className="mt-8 rounded-2xl bg-rose-50 p-4 text-rose-700">{error}</p>}
          {donation && <>
            <h1 className="mt-3 text-3xl font-bold text-slate-900">{donation.foodType}</h1>
            {donation.notes && <p className="mt-3 text-slate-600">{donation.notes}</p>}
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <Detail label="Category" value={donation.category} />
              <Detail label="Status" value={donation.status} />
              <Detail label="Location" value={donation.location} />
              <Detail label="Pickup time" value={donation.pickupTime || 'Not specified'} />
            </div>
          </>}
          <div className="mt-8">
            <Link to="/available-donations" className="rounded-full border border-slate-300 px-5 py-3 font-semibold text-slate-700">Back to listings</Link>
          </div>
        </div>
      </section>
    </Layout>
  )
}

function Detail({ label, value }) {
  return <div className="rounded-2xl bg-slate-50 p-5"><p className="text-sm font-medium text-slate-500">{label}</p><p className="mt-2 text-lg font-semibold capitalize text-slate-900">{value}</p></div>
}
