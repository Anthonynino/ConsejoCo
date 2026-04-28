import { FaSearch, FaFilter } from "react-icons/fa";
import CardMinute from "./CardMinute";

const MOCK_MINUTES = [
  { id: 1, title: "Asamblea General de Presupuesto 2024", date: "2024-03-20", type: "Ordinaria", attendance: 85, status: "Firmada" },
  { id: 2, title: "Reunión de Emergencia: Alumbrado Calle 3", date: "2024-03-15", type: "Extraordinaria", attendance: 24, status: "Firmada" },
  { id: 3, title: "Elección de Comité Electoral", date: "2024-03-05", type: "Asamblea General", attendance: 112, status: "En Revisión" },
  { id: 4, title: "Planificación de Jornada CLAP Abril", date: "2024-02-28", type: "Ordinaria", attendance: 30, status: "Firmada" },
];

const MinuteTable = () => {
  const typeColors = {
    "Ordinaria": "badge-ghost",
    "Extraordinaria": "badge-warning",
    "Asamblea General": "badge-primary",
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-base-100 p-4 rounded-xl border border-base-200">
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30 h-3.5 w-3.5" />
          <input 
            type="text" 
            placeholder="Buscar por título o fecha..." 
            className="input input-bordered input-sm w-full pl-9 focus:input-primary transition-all bg-base-200/20"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <select className="select select-bordered select-sm focus:select-primary bg-base-200/20">
            <option disabled selected>Tipo de Acta</option>
            <option>Ordinaria</option>
            <option>Extraordinaria</option>
            <option>Asamblea General</option>
          </select>
          <button className="btn btn-square btn-bordered btn-sm opacity-60 hover:opacity-100"><FaFilter /></button>
        </div>
      </div>

      {/* Grid de tarjetas */}
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_MINUTES.map((acta) => (
          <CardMinute key={acta.id} acta={acta} typeColors={typeColors} />
        ))}
      </div>
    </div>
  );
};

export default MinuteTable;
