import { FaSearch, FaFilter } from "react-icons/fa";
import CardResident from "./CardResident";

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

      {/* Grid de tarjetas */}
      <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_RESIDENTS.map((resident) => (
          <CardResident key={resident.id} resident={resident} />
        ))}
      </div>
    </div>
  );
};

export default ResidentTable;
