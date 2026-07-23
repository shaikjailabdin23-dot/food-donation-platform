import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { FiMenu, FiX, FiSun, FiMoon } from 'react-icons/fi'
import { useAuth } from '../context/useAuth'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/available-donations', label: 'Donations' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-bold tracking-tight text-emerald-600">
          FoodBridge
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `text-sm font-medium transition ${isActive ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600 dark:text-slate-300'}`}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button onClick={() => setDarkMode((v) => !v)} className="rounded-full border border-slate-200 p-2 text-slate-700 dark:border-slate-700 dark:text-slate-200">
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
          {user ? (
            <>
              <Link to="/dashboard" className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">Dashboard</Link>
              <button onClick={logout} className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">Login</Link>
              <Link to="/register" className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white">Register</Link>
            </>
          )}
          <button onClick={() => setOpen((v) => !v)} className="rounded-full border border-slate-300 p-2 text-slate-700 md:hidden dark:border-slate-700 dark:text-slate-200">
            {open ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white p-4 md:hidden dark:border-slate-800 dark:bg-slate-950">
          <div className="flex flex-col gap-3">
            {links.map((item) => (
              <NavLink key={item.to} to={item.to} onClick={() => setOpen(false)} className="text-sm font-medium text-slate-600 dark:text-slate-300">
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
