import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
})

api.interceptors.request.use((config) => {
  const user = localStorage.getItem('foodbridge-user')
  if (user) {
    const parsedUser = JSON.parse(user)
    if (parsedUser.token) {
      config.headers.Authorization = `Bearer ${parsedUser.token}`
    }
  }
  return config
})

export default api
