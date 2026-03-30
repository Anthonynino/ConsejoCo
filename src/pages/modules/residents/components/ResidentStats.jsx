import { FaUsers, FaChild, FaBlind, FaVenusMars } from "react-icons/fa";

const ResidentStats = () => {
  const stats = [
    { label: "Total Habitantes", value: "1,240", icon: FaUsers, color: "text-primary", bg: "bg-primary/10" },
    { label: "Menores de Edad", value: "320", icon: FaChild, color: "text-info", bg: "bg-info/10" },
    { label: "Adultos Mayores", value: "156", icon: FaBlind, color: "text-warning", bg: "bg-warning/10" },
    { label: "Diversidad Género", value: "52% F / 48% M", icon: FaVenusMars, color: "text-secondary", bg: "bg-secondary/10" },
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

export default ResidentStats;
