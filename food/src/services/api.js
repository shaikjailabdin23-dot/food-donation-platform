import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  const user = localStorage.getItem('foodbridge-user')
  if (user) {
    try {
      const parsedUser = JSON.parse(user)
      if (parsedUser?.token) {
        config.headers.Authorization = `Bearer ${parsedUser.token}`
      }
    } catch {
      localStorage.removeItem('foodbridge-user')
    }
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Only clear token if explicit 401 session expired message returned from backend
    if (error.response?.status === 401 && error.response?.data?.message?.toLowerCase().includes('session has expired')) {
      localStorage.removeItem('foodbridge-user')
    }
    return Promise.reject(error)
  }
)

export default api
