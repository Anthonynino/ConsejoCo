import axios from 'axios'

/**
 * Instancia base de Axios.
 * - baseURL apunta al backend local en desarrollo.
 * - withCredentials: true → la cookie de sesión (sid) viaja en cada petición.
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Interceptor de respuesta: si el backend devuelve 401, redirige al login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Evitar bucle infinito si ya estamos en /
      if (window.location.pathname !== '/') {
        window.location.href = '/'
      }
    }
    return Promise.reject(error)
  }
)

export default api
