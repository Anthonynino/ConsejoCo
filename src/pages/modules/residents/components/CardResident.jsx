import { FaPhoneAlt, FaPen, FaTrashAlt } from "react-icons/fa";
import { FaEllipsisV } from "react-icons/fa";
import Avatar from "../../../../components/Avatar";

const CardResident = ({ resident, idx, onDelete, onEdit }) => {
  const fullName = `${resident.nombres} ${resident.apellidos}`;
  
  const initials = (resident.nombres || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 1)
    .concat((resident.apellidos || "").split(" ").filter(Boolean).slice(0,1))
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  // Calcular edad básica si hay fecha de nacimiento
  const calculateAge = (birthday) => {
    if (!birthday) return "N/A";
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs); 
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="card-body p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Avatar initials={initials} idx={idx}/>
            <div className="min-w-0">
              <h3 className="card-title text-sm font-bold truncate max-w-[180px]">
                {fullName}
              </h3>
              <p className="text-xs opacity-60 uppercase tracking-tighter">
                V-{resident.cedula}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button 
              onClick={() => onEdit(resident)}
              className="btn btn-ghost btn-circle btn-xs text-base-content/40 hover:text-primary transition-colors"
            >
              <FaPen className="h-3 w-3" />
            </button>

            <div className="dropdown dropdown-left">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-xs btn-circle text-base-content/40 hover:text-primary transition-colors"
              >
                <FaEllipsisV className="opacity-60" />
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content z-1 menu p-2 shadow bg-base-100 rounded-box w-48 border border-base-200"
              >
                <li>
                  <button onClick={() => onEdit(resident)}>Editar Datos</button>
                </li>
                <li>
                  <a>Ver Grupo Familiar</a>
                </li>
                <li>
                  <button 
                    onClick={() => onDelete(resident.id)}
                    className="text-error"
                  >
                    Dar de Baja
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="divider my-1 opacity-20"></div>

        <div className="space-y-4">
          <div className="space-y-2.5">
            <div className="flex items-center gap-3 text-xs font-medium text-base-content/70">
              <div className="p-1.5 bg-base-200 rounded-lg">
                <FaPhoneAlt className="text-primary" />
              </div>
              <span>{resident.telefono || "Sin teléfono"}</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-xs font-medium text-base-content/70">
                <div className="p-1.5 bg-base-200 rounded-lg">
                  <span className="text-[10px] font-bold opacity-70">Edad</span>
                </div>
                <span>{calculateAge(resident.fechaNacimiento)} años</span>
              </div>

              <span className="badge badge-info badge-outline badge-sm text-[10px] font-bold uppercase">
                {resident.genero === "M" ? "Masculino" : "Femenino"}
              </span>
            </div>

            <div>
              {resident.familiaId ? (
                <span className="badge badge-primary badge-outline badge-sm text-[9px] uppercase font-extrabold tracking-tighter shadow-sm">
                  Casa #{resident.familia?.numeroDeCasa || resident.familiaId}
                </span>
              ) : (
                <span className="badge badge-ghost badge-sm text-[9px] uppercase font-bold opacity-60">
                  Sin Carga Familiar
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardResident;
