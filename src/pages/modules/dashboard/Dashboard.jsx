import StadisticCard from "../../../components/StadisticCard";
import { useState, useEffect } from "react";
import { getDashboardStats } from "../../../services/dashboard";
import { useAuth } from "../../../context/AuthContext";
import {
  FaUsers,
  FaProjectDiagram,
  FaFileAlt,
  FaChartLine,
  FaHandsHelping,
  FaCalendarCheck,
  FaBox,
} from "react-icons/fa";

function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user } = useAuth();
  const [consejoNombre, setConsejoNombre] = useState("Cargando...");
  const [stats, setStats] = useState({
    habitantes: 0,
    familias: 0,
    proyectos: 0,
  });

  useEffect(() => {
    if (user?.consejoComunalId) {
      getDashboardStats(user.consejoComunalId)
        .then((data) => {
          setConsejoNombre(data.data.nombre);
          setStats({
            habitantes: data.data._count?.habitantes || 0,
            familias: data.data._count?.familias || 0,
            proyectos: data.data._count?.proyectos || 0,
          });
        })
        .catch((err) => console.error("Error al cargar dashboard", err));
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [user?.consejoComunalId]);

  // Estadísticas del consejo comunal
  const statistics = [
    {
      label: "Habitantes",
      value: stats.habitantes.toLocaleString("es-VE"),
      icon: FaUsers,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      label: "Familias",
      value: stats.familias.toLocaleString("es-VE"),
      icon: FaUsers,
      color: "text-info",
      bg: "bg-info/10",
    },
    {
      label: "Proyectos Activos",
      value: stats.proyectos.toString(),
      icon: FaProjectDiagram,
      color: "text-secondary",
      bg: "bg-secondary/10",
    },
    {
      label: "Presupuesto",
      value: "Bs. 0",
      icon: FaChartLine,
      color: "text-success",
      bg: "bg-success/10",
    },
  ];

  // Actividades recientes
  const recentActivities = [
    {
      title: "Reunión Mensual",
      description: "Asamblea comunal del mes de mayo",
      date: "15 de Mayo, 2024",
      icon: FaCalendarCheck,
      color: "text-info",
    },
    {
      title: "Entrega CLAP",
      description: "Distribución de alimentos a familias beneficiadas",
      date: "10 de Mayo, 2024",
      icon: FaBox,
      color: "text-warning",
    },
    {
      title: "Proyecto Comunitario",
      description: "Mejora de parque infantil sector B",
      date: "5 de Mayo, 2024",
      icon: FaProjectDiagram,
      color: "text-success",
    },
  ];

  return (
    <div className="w-full space-y-6 mx-auto p-6">
      {/* Header de Bienvenida */}
      <div className="bg-linear-to-r from-primary to-secondary text-primary-content rounded-2xl p-8 shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Bienvenido al Sistema
            </h1>
            <p className="text-lg opacity-90 mb-4">
              {consejoNombre}
            </p>
            <div className="flex items-center gap-2 text-sm opacity-80">
              <FaHandsHelping className="text-xl" />
              <span>Gestión comunitaria eficiente y transparente</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">
              {currentTime.toLocaleDateString("es-VE", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="text-lg opacity-90">
              {currentTime.toLocaleTimeString("es-VE")}
            </div>
          </div>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-base-content">Resumen General</h2>
        <StadisticCard stats={statistics} cols={4} />
      </div>

      {/* Contenido Principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Actividades Recientes */}
        <div className="lg:col-span-2">
          <div className="card bg-base-100 border border-base-200 shadow-sm">
            <div className="card-body p-6">
              <h3 className="card-title text-lg font-bold text-base-content mb-4">
                Actividades Recientes
              </h3>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-base-50 hover:bg-base-100 transition-colors"
                  >
                    <div
                      className={`p-2 rounded-lg ${activity.color} bg-current/10`}
                    >
                      <activity.icon className="text-lg" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-base-content">
                        {activity.title}
                      </h4>
                      <p className="text-sm text-base-content/60">
                        {activity.description}
                      </p>
                      <p className="text-xs text-base-content/40 mt-1">
                        {activity.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          {/* Información del Sistema */}
          <div className="card bg-base-100 border border-base-200 shadow-sm mt-4">
            <div className="card-body p-6">
              <h3 className="card-title text-lg font-bold text-base-content mb-4">
                Información del Sistema
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-base-content/60">Versión</span>
                  <span className="text-sm font-medium">v1.0.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-base-content/60">
                    Última actualización
                  </span>
                  <span className="text-sm font-medium">01/05/2024</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-base-content/60">Estado</span>
                  <span className="badge badge-success badge-sm">
                    Operativo
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
