import { FaPhoneAlt, FaPen } from "react-icons/fa";
import { FaEllipsisV } from "react-icons/fa";

const CardResident = ({ resident }) => {
  const initials = (resident.name || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join("")
    .toUpperCase();

  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="card-body p-5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="avatar avatar-placeholder">
              <div className="bg-neutral text-neutral-content rounded-full w-12">
                <span className="text-lg font-bold">{initials}</span>
              </div>
            </div>
            <div className="min-w-0">
              <h3 className="card-title text-sm font-bold truncate max-w-[180px]">
                {resident.name}
              </h3>
              <p className="text-xs opacity-60 uppercase tracking-tighter">
                {resident.idNumber}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="btn btn-ghost btn-circle btn-xs text-base-content/40 hover:text-primary transition-colors">
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
                  <a>Editar Datos</a>
                </li>
                <li>
                  <a>Ver Grupo Familiar</a>
                </li>
                <li>
                  <a className="text-error">Dar de Baja</a>
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
              <span>{resident.phone}</span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 text-xs font-medium text-base-content/70">
                <div className="p-1.5 bg-base-200 rounded-lg">
                  <span className="text-[10px] font-bold opacity-70">Edad</span>
                </div>
                <span>{resident.age} años</span>
              </div>

              <span className="badge badge-ghost badge-sm text-[10px] font-bold uppercase">
                {resident.sector}
              </span>
            </div>

            <div>
              {resident.headOfFamily ? (
                <span className="badge badge-primary badge-outline badge-sm text-[9px] uppercase font-extrabold tracking-tighter shadow-sm">
                  Jefe de Familia
                </span>
              ) : (
                <span className="badge badge-ghost badge-sm text-[9px] uppercase font-bold opacity-60">
                  Integrante
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
