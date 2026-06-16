import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import CardResident from "./CardResident";
import CustomInput from "../../../../components/CustomInput";
import CustomSelect from "../../../../components/CustomSelect";

const ResidentTable = ({
  residents = [],
  onDelete,
  onEdit,
  totalResidents,
  meta,
  page,
  setPage,
}) => {
  const [search, setSearch] = useState("");

  const filteredResidents = residents.filter((resident) => {
    const fullName = `${resident.nombres} ${resident.apellidos}`.toLowerCase();
    const cedula = (resident.cedula || "").toLowerCase();
    return (
      fullName.includes(search.toLowerCase()) ||
      cedula.includes(search.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Barra de Filtros */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-4 bg-base-100 p-4 rounded-xl border border-base-200">
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <CustomInput
            label="Búsqueda"
            className="md:w-72"
            placeholder="Nombre o cédula..."
            icon={FaSearch}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="text-xs opacity-60 pb-2">
          Mostrando{" "}
          <span className="font-bold text-base-content">
            {residents.length}
          </span>{" "}
          de{" "}
          <span className="font-bold text-base-content">{totalResidents}</span>{" "}
          registros
        </div>
      </div>

      {/* Paginación */}
      {meta.totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <div className="join shadow-sm border border-base-200">
            <button
              className="join-item btn btn-sm"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              «
            </button>
            <button className="join-item btn btn-sm bg-base-100">
              Página {page} de {meta.totalPages}
            </button>
            <button
              className="join-item btn btn-sm"
              disabled={page === meta.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              »
            </button>
          </div>
        </div>
      )}

      {filteredResidents.length > 0 ? (
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResidents.map((resident, idx) => (
            <CardResident
              key={resident.id}
              idx={idx}
              resident={resident}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-20 bg-base-200/20 rounded-2xl border-2 border-dashed border-base-300 opacity-50">
          <p className="font-medium">
            No se encontraron habitantes con estos criterios.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResidentTable;
