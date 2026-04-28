import { FaProjectDiagram, FaHammer, FaCheckCircle, FaChartPie } from "react-icons/fa";

const ProjectStats = () => {
  const stats = [
    { label: "Total Proyectos", value: "12", icon: FaProjectDiagram, color: "text-primary", bg: "bg-primary/10" },
    { label: "En Ejecución", value: "4", icon: FaHammer, color: "text-warning", bg: "bg-warning/10" },
    { label: "Finalizados", value: "8", icon: FaCheckCircle, color: "text-success", bg: "bg-success/10" },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="card bg-base-100 border border-base-200 shadow-sm p-4 hover:shadow-md transition-all">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              <stat.icon className={`text-xl ${stat.color}`} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold opacity-50 tracking-wider leading-none mb-1">{stat.label}</p>
              <h4 className="text-xl font-bold text-base-content leading-none">{stat.value}</h4>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectStats;
