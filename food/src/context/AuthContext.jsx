import { useEffect, useMemo, useState } from 'react'
import { AuthContext } from './authContext'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedUser = localStorage.getItem('foodbridge-user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem('foodbridge-user')
      }
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    localStorage.setItem('foodbridge-user', JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('foodbridge-user')
    setUser(null)
  }

  const value = useMemo(() => ({ user, login, logout, loading }), [user, loading])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
