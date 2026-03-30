import { FaSearch, FaFilter, FaDownload, FaEye, FaCalendarAlt } from "react-icons/fa";

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

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 rounded-xl border border-base-200 shadow-sm">
        <table className="table table-zebra w-full text-sm">
          <thead>
            <tr className="bg-base-200/30">
              <th className="text-[10px] uppercase opacity-50 font-bold tracking-wider">Título de la Acta</th>
              <th className="text-[10px] uppercase opacity-50 font-bold tracking-wider text-center">Fecha</th>
              <th className="text-[10px] uppercase opacity-50 font-bold tracking-wider text-center">Tipo</th>
              <th className="text-[10px] uppercase opacity-50 font-bold tracking-wider text-center">Asistencia</th>
              <th className="text-[10px] uppercase opacity-50 font-bold tracking-wider text-center">Estado</th>
              <th className="text-[10px] uppercase opacity-50 font-bold tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_MINUTES.map((acta) => (
              <tr key={acta.id} className="hover:bg-base-200/10 transition-colors">
                <td>
                  <div className="font-bold text-base-content max-w-[250px] truncate">{acta.title}</div>
                </td>
                <td className="text-center">
                  <span className="flex items-center justify-center gap-2 text-xs opacity-70 italic font-mono">
                    <FaCalendarAlt size={10} className="text-primary" /> {acta.date}
                  </span>
                </td>
                <td className="text-center">
                  <span className={`badge ${typeColors[acta.type]} badge-sm text-[9px] uppercase font-bold tracking-tighter`}>
                    {acta.type}
                  </span>
                </td>
                <td className="text-center font-medium">
                  {acta.attendance} delegados
                </td>
                <td className="text-center">
                  <span className={`badge ${acta.status === 'Firmada' ? 'badge-success' : 'badge-neutral'} badge-sm text-[9px] uppercase font-bold`}>
                    {acta.status}
                  </span>
                </td>
                <td className="text-right">
                  <div className="flex justify-end gap-1">
                    <button className="btn btn-ghost btn-xs btn-square text-primary" title="Ver Acta"><FaEye /></button>
                    <button className="btn btn-ghost btn-xs btn-square text-success" title="Descargar PDF"><FaDownload /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MinuteTable;
