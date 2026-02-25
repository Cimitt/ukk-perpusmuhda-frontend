import axios, { AxiosError, AxiosRequestConfig } from 'axios'

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
})

const refreshClient = axios.create({ baseURL })

const publicRoutes = [
  '/auth/login/',
  '/auth/register/',
  '/auth/token/refresh/',
]

// Request interceptor
api.interceptors.request.use((config) => {
  if (publicRoutes.some((route) => config.url?.includes(route))) {
    return config
  }

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }

  return config
})

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      if (typeof window === 'undefined') {
        return Promise.reject(error)
      }

      const refreshToken = localStorage.getItem('refresh_token')
      if (!refreshToken) {
        window.location.href = '/login'
        return Promise.reject(error)
      }

      try {
        const response = await refreshClient.post(
          '/auth/token/refresh/',
          { refresh: refreshToken }
        )

        const { access } = response.data
        localStorage.setItem('access_token', access)

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${access}`,
        }

        return api(originalRequest)
      } catch (err) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/login'
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

export default api