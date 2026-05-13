import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../services/api'

// ── Contexto ──────────────────────────────────────────────────────────────────

const AuthContext = createContext(null)

// ── Provider ──────────────────────────────────────────────────────────────────

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null)   // datos del usuario (sin passwordHash)
  const [role, setRole]       = useState(null)   // string: 'ADMIN' | 'COORDINADOR' | etc.
  const [loading, setLoading] = useState(true)   // true mientras se verifica la sesión inicial

  // Verifica si ya existe una sesión activa al cargar la app
  useEffect(() => {
    api.get('/auth/me')
      .then(({ data }) => {
        setUser(data.data)
        setRole(data.data?.rol ?? null)
      })
      .catch(() => {
        setUser(null)
        setRole(null)
      })
      .finally(() => setLoading(false))
  }, [])

  // ── login ──────────────────────────────────────────────────────────────────
  const login = useCallback(async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password })
    setUser(data.data)
    setRole(data.data?.rol ?? null)
    return data.data
  }, [])

  // ── logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    await api.post('/auth/logout')
    setUser(null)
    setRole(null)
  }, [])

  // ── hasRole ────────────────────────────────────────────────────────────────
  /** Comprueba si el usuario tiene alguno de los roles indicados. */
  const hasRole = useCallback(
    (...requiredRoles) => requiredRoles.includes(role),
    [role]
  )

  return (
    <AuthContext.Provider value={{ user, role, loading, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  )
}

// ── Hook ───────────────────────────────────────────────────────────────────────

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
