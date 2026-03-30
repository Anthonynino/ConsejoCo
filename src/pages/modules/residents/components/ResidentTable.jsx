import { FaSearch, FaFilter, FaEllipsisV, FaPhoneAlt } from "react-icons/fa";

const MOCK_RESIDENTS = [
  { id: 1, name: "Laura Martínez", idNumber: "V-12.345.678", age: 34, phone: "0414-123-4567", sector: "Sector 1", headOfFamily: true },
  { id: 2, name: "Carlos Rondón", idNumber: "V-18.765.432", age: 28, phone: "0424-987-6543", sector: "Sector 2", headOfFamily: true },
  { id: 3, name: "María Useche", idNumber: "V-20.111.222", age: 45, phone: "0416-555-0011", sector: "Sector 1", headOfFamily: false },
  { id: 4, name: "Pedro Salinas", idNumber: "V-15.999.001", age: 52, phone: "0412-300-1122", sector: "Sector 3", headOfFamily: true },
  { id: 5, name: "Ana Figueroa", idNumber: "V-22.456.789", age: 22, phone: "0426-741-8520", sector: "Sector 2", headOfFamily: false },
];

const ResidentTable = () => {
  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-base-100 p-4 rounded-xl border border-base-200">
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 opacity-30 h-3.5 w-3.5" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o cédula..." 
            className="input input-bordered input-sm w-full pl-9 focus:input-primary transition-all bg-base-200/20"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          <select className="select select-bordered select-sm focus:select-primary bg-base-200/20">
            <option disabled selected>Filtrar por Sector</option>
            <option>Todos</option>
            <option>Sector 1</option>
            <option>Sector 2</option>
            <option>Sector 3</option>
          </select>
          <button className="btn btn-square btn-bordered btn-sm opacity-60 hover:opacity-100"><FaFilter /></button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-base-100 rounded-xl border border-base-200 shadow-sm">
        <table className="table table-zebra w-full text-sm">
          <thead>
            <tr className="bg-base-200/30">
              <th className="text-[10px] uppercase opacity-50 font-bold tracking-wider">Habitante</th>
              <th className="text-[10px] uppercase opacity-50 font-bold tracking-wider">Cédula / ID</th>
              <th className="text-[10px] uppercase opacity-50 font-bold tracking-wider text-center">Edad</th>
              <th className="text-[10px] uppercase opacity-50 font-bold tracking-wider">Sector</th>
              <th className="text-[10px] uppercase opacity-50 font-bold tracking-wider text-center">Rol Familiar</th>
              <th className="text-[10px] uppercase opacity-50 font-bold tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_RESIDENTS.map((resident) => (
              <tr key={resident.id} className="hover:bg-base-200/10 transition-colors">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-neutral text-neutral-content rounded-lg w-8 h-8">
                        <span className="text-xs font-bold">{resident.name.substring(0, 2).toUpperCase()}</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-base-content">{resident.name}</div>
                      <div className="text-[10px] opacity-50 flex items-center gap-1">
                        <FaPhoneAlt size={8} /> {resident.phone}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="font-mono text-xs opacity-70 italic">{resident.idNumber}</td>
                <td className="text-center font-medium">{resident.age} años</td>
                <td>
                  <span className="badge badge-ghost badge-sm text-[10px] font-bold uppercase">{resident.sector}</span>
                </td>
                <td className="text-center">
                  {resident.headOfFamily ? (
                    <span className="badge badge-primary badge-outline badge-sm text-[9px] uppercase font-extrabold tracking-tighter shadow-sm">Jefe de Familia</span>
                  ) : (
                    <span className="badge badge-ghost badge-sm text-[9px] uppercase font-bold opacity-60">Integrante</span>
                  )}
                </td>
                <td className="text-right">
                  <div className="dropdown dropdown-left">
                    <label tabIndex={0} className="btn btn-ghost btn-xs btn-circle"><FaEllipsisV className="opacity-40" /></label>
                    <ul tabIndex={0} className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box w-48 border border-base-200">
                      <li><a>Editar Datos</a></li>
                      <li><a>Ver Grupo Familiar</a></li>
                      <li><a className="text-error">Dar de Baja</a></li>
                    </ul>
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

export default ResidentTable;
