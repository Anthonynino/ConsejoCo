import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaBoxes,
  FaProjectDiagram,
  FaUsers,
  FaFileAlt,
  FaFolderOpen,
  FaChartLine,
  FaUserCog,
  FaHome,
  FaHandsHelping,
  FaSignOutAlt,
} from "react-icons/fa";

const navigation = [
  { name: "Dashboard", path: "/dashboard", icon: FaHome },
  { name: "CLAP", path: "/clap", icon: FaBoxes },
  { name: "Proyectos", path: "/projects", icon: FaProjectDiagram },
  { name: "Habitantes", path: "/residents", icon: FaUsers },
  { name: "Actas", path: "/proceedings", icon: FaFileAlt },
  { name: "Documentos", path: "/documents", icon: FaFolderOpen },
  { name: "Finanzas", path: "/finances", icon: FaChartLine },
  { name: "Miembros", path: "/members", icon: FaUserCog },
];

const AppLayout = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="sidebar-drawer" type="checkbox" className="drawer-toggle" />

      {/* Contenido principal */}
      <div className="drawer-content flex flex-col">
        {/* Navbar para móviles */}
        <div className="navbar bg-base-100 lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="sidebar-drawer"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
        </div>

        {/* Contenido de página */}
        <main className="p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="sidebar-drawer" className="drawer-overlay"></label>
        <aside className="bg-base-200 w-80 h-full">
          <div className="px-4 py-5 border-b border-base-300">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-primary">
                Consejo Comunal
              </h2>
              <FaHandsHelping className="text-2xl text-primary" />
            </div>
            <p className="text-sm opacity-70">La Victoria</p>
          </div>
          <ul className="menu p-4 w-full">
            {navigation.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 ${isActive ? "active" : ""}`
                  }
                >
                  <item.icon className="text-xl" />
                  <span>{item.name}</span>
                </NavLink>
              </li>
            ))}

            <div className="divider my-2"></div>
            
            <li>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 text-error hover:bg-error hover:text-error-content"
              >
                <FaSignOutAlt className="text-xl" />
                <span className="font-semibold">Cerrar Sesión</span>
              </button>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default AppLayout;
