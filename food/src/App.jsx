import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import DonorDashboard from './pages/DonorDashboard'
import NgoDashboard from './pages/Ngodashboard'
import AdminDashboard from './pages/AdminDashboard'
import Donate from './pages/Donate'
import Dashboard from './pages/Dashboard'
import AvailableDonations from './pages/AvailableDonations'
import About from './pages/About'
import Contact from './pages/Contact'
import DonationDetails from './pages/DonationDetails'
import MyDonations from './pages/MyDonations'
import Notifications from './pages/Ngonotifications'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/donor-dashboard" element={<DonorDashboard />} />
          <Route path="/ngo-dashboard" element={<NgoDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/my-donations" element={<MyDonations />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="/available-donations" element={<AvailableDonations />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/donations/:id" element={<DonationDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
