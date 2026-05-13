import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

/**
 * Protege rutas que requieren sesión activa.
 * Se usa como `element` de una ruta layout en React Router.
 *
 * Uso básico (solo sesión):
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/dashboard" element={<Dashboard />} />
 *   </Route>
 *
 * Uso con rol requerido — pasar roles a la ruta hoja individual:
 *   <Route element={<ProtectedRoute roles={['ADMIN']} />}>
 *     <Route path="/admin" element={<AdminPage />} />
 *   </Route>
 */
export default function ProtectedRoute({ roles = [] }) {
  const { user, loading, hasRole } = useAuth()

  // Mientras se verifica la sesión inicial → spinner
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    )
  }

  // Sin sesión → al login
  if (!user) return <Navigate to="/" replace />

  // Con roles requeridos → verificar permiso
  if (roles.length > 0 && !hasRole(...roles)) {
    return <Navigate to="/dashboard" replace />
  }

  // Renderiza el hijo definido en las rutas anidadas
  return <Outlet />
}
