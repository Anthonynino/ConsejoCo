import { FaFileSignature, FaCalendarCheck, FaUsers, FaExclamationCircle } from "react-icons/fa";

const MinuteStats = () => {
  const stats = [
    { label: "Total de Actas", value: "42", icon: FaFileSignature, color: "text-primary", bg: "bg-primary/10" },
    { label: "Asambleas este Mes", value: "3", icon: FaCalendarCheck, color: "text-info", bg: "bg-info/10" },
    { label: "Promedio Asistencia", value: "78%", icon: FaUsers, color: "text-success", bg: "bg-success/10" },
    { label: "Extraordinarias", value: "5", icon: FaExclamationCircle, color: "text-warning", bg: "bg-warning/10" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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

export default MinuteStats;
