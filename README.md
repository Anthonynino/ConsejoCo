# 🏘️ ConsejoCo — Frontend

Panel administrativo web para Consejos Comunales.  
Stack: **React 19 · Vite · TailwindCSS · DaisyUI · React Router · Axios**

---

## 🚀 Levantar el proyecto desde cero

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_API_URL=http://localhost:3000/api
```

> Asegúrate de que el backend (`consejoCo_backend`) esté corriendo antes de iniciar el frontend.

### 3. Iniciar el servidor de desarrollo

```bash
npm run dev
```

La app estará disponible en `http://localhost:5173`.

---

## 📦 Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo con HMR |
| `npm run build` | Genera el bundle de producción en `dist/` |
| `npm run preview` | Previsualiza el bundle de producción |
| `npm run lint` | Analiza el código con ESLint |

---

## 🔐 Autenticación

La autenticación es por **sesión con cookie** (`sid`).  
Axios está configurado con `withCredentials: true` en `src/services/api.js` para que la cookie viaje automáticamente en cada petición.

### Flujo

```
Login (POST /api/auth/login)
  → Backend crea la sesión y devuelve el usuario + rol
  → AuthContext guarda user y role
  → React Router navega a /dashboard

Recarga de página
  → AuthContext llama GET /api/auth/me
  → Si hay sesión activa → restaura el estado sin pedir login
  → Si no hay sesión → muestra Login

Rutas protegidas
  → ProtectedRoute verifica que user !== null
  → Si no hay sesión → redirige a /
  → Si el rol no tiene permiso → redirige a /dashboard
```

---

## 📐 Estructura del proyecto

```
src/
├── context/
│   └── AuthContext.jsx    # Estado global de sesión: user, role, login(), logout()
├── services/
│   └── api.js             # Instancia de Axios con baseURL y withCredentials
├── routes/
│   ├── AppRouter.jsx      # Definición de rutas públicas y protegidas
│   └── ProtectedRoute.jsx # Guard: redirige si no hay sesión
├── pages/
│   ├── auth/
│   │   └── Login.jsx      # Formulario de login integrado con el backend
│   └── modules/           # Páginas del panel (dashboard, miembros, etc.)
├── layout/
│   └── AppLayout.jsx      # Sidebar + Navbar envolvente de las páginas internas
└── components/            # Componentes reutilizables
```

---

## 🔑 Credenciales de prueba

> Requiere que el backend esté corriendo y el seed ejecutado.

| Rol | Email | Contraseña |
|---|---|---|
| ADMIN | `admin@consejocomunal.com` | `admin12345` |
| VOCERO | `vocero@consejocomunal.com` | `vocero12345` |

---

## 🔗 Backend requerido

Este frontend consume la API de `consejoCo_backend`.  
Consulta el README del backend para instrucciones de setup completo, incluyendo la guía de migraciones de Prisma.
