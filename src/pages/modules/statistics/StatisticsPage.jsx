import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getReporteEstadistica, getStatistics } from "../../../services/statistics";
import HeaderModules from "../../../components/HeaderModules";
import StadisticCard from "../../../components/StadisticCard";
import {
  FaUsers, FaHome, FaChild, FaUserGraduate,
  FaUser, FaUserTie, FaMars, FaVenus,
  FaHeartbeat, FaWheelchair
} from "react-icons/fa";

export default function StatisticsPage() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)

  const [loadingReporte, setLoadingReporte] = useState(false)

  const handleReporte = async () => {
  setLoadingReporte(true)
  try {
    await getReporteEstadistica("todos", 1)
    toast.success("Reporte generado correctamente")
  } catch (error) {
    toast.error("Error al generar el reporte")
  } finally {
    setLoadingReporte(false)
  }
}


  useEffect(() => {
  const fetchStats = async () => {
    setLoading(true)
    try {
      const res = await getStatistics()
      console.log(res.data)
      setStats(res.data)
    } catch (error) {
      toast.error("Error al cargar las estadísticas")
    } finally {
      setLoading(false)
    }
  }
  fetchStats()
}, [])

  if (loading || !stats) return (
    <div className="w-full p-6 flex items-center justify-center py-20">
      <span className="text-base-content/40 text-sm">Cargando estadísticas...</span>
    </div>
  )

  const generalCards = [
    { label: "Total habitantes",  value: stats.totalHabitantes, icon: FaUsers,  color: "text-primary",  bg: "bg-primary/10"  },
    { label: "Total familias",    value: stats.totalFamilias,   icon: FaHome,   color: "text-secondary", bg: "bg-secondary/10" },
    { label: "Promedio de edad",  value: stats.promedioEdad,    icon: FaUser,   color: "text-accent",    bg: "bg-accent/10"   },
  ]

  const generoCards = [
    { label: "Hombres", value: stats.hombres, icon: FaMars,   color: "text-info",    bg: "bg-info/10"   },
    { label: "Mujeres", value: stats.mujeres, icon: FaVenus,  color: "text-pink-500", bg: "bg-pink-500/10" },
  ]

  const gruposCards = [
    { label: "Niñas",             value: stats.ninosF,         icon: FaChild,        color: "text-success", bg: "bg-success/10" },
    { label: "Niños",             value: stats.ninosM,         icon: FaChild,        color: "text-info",    bg: "bg-info/10"    },
    { label: "Adolescentes F",    value: stats.adolescentesF,  icon: FaUserGraduate, color: "text-success", bg: "bg-success/10" },
    { label: "Adolescentes M",    value: stats.adolescentesM,  icon: FaUserGraduate, color: "text-info",    bg: "bg-info/10"    },
    { label: "Adultas",           value: stats.adultosF,       icon: FaUser,         color: "text-success", bg: "bg-success/10" },
    { label: "Adultos",           value: stats.adultosM,       icon: FaUser,         color: "text-info",    bg: "bg-info/10"    },
    { label: "Adultas mayores",   value: stats.adultosMayoresF, icon: FaUserTie,     color: "text-success", bg: "bg-success/10" },
    { label: "Adultos mayores",   value: stats.adultosMayoresM, icon: FaUserTie,     color: "text-info",    bg: "bg-info/10"    },
  ]

  const especialCards = [
    { label: "Embarazadas",    value: stats.embarazadas,    icon: FaHeartbeat,   color: "text-warning", bg: "bg-warning/10" },
    { label: "Discapacitados", value: stats.discapacitados, icon: FaWheelchair,  color: "text-error",   bg: "bg-error/10"   },
  ]

  return (
    <div className="w-full space-y-6 mx-auto p-6">

      <HeaderModules
        title="Estadísticas"
        description="Resumen demográfico de la comunidad"
        titleBtn={loadingReporte ? "Generando..." : "Generar PDF"}
        onActionBtn= {handleReporte}
        
      />

      {/* General */}
      <div>
        <p className="text-xs font-medium text-base-content/50 uppercase tracking-wide mb-3">General</p>
        <StadisticCard stats={generalCards} cols={3} />
      </div>

      {/* Género */}
      <div>
        <p className="text-xs font-medium text-base-content/50 uppercase tracking-wide mb-3">Por género</p>
        <StadisticCard stats={generoCards} cols={2} />
      </div>

      {/* Grupos etarios */}
      <div>
        <p className="text-xs font-medium text-base-content/50 uppercase tracking-wide mb-3">Grupos etarios</p>
        <StadisticCard stats={gruposCards} cols={4} />
      </div>

      {/* Especiales */}
      <div>
        <p className="text-xs font-medium text-base-content/50 uppercase tracking-wide mb-3">Condiciones especiales</p>
        <StadisticCard stats={especialCards} cols={2} />
      </div>

    </div>
  )
}