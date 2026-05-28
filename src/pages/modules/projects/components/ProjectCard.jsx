import { FaCalendarAlt, FaMapMarkerAlt, FaMoneyBillWave, FaEdit, FaTrash } from "react-icons/fa";

const ProjectCard = ({ project, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.split("T")[0];
  };
  const statusColors = {
    EN_EJECUCION: "badge-warning",
    COMPLETADO: "badge-success",
    PLANIFICADO: "badge-neutral",
    EN_PAUSA: "badge-info",
    CANCELADO: "badge-error",
  };

  const priorityColors = {
    ALTA: "badge-error",
    MEDIA: "badge-warning",
    BAJA: "badge-info",
  };

  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all group relative">
      <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="btn btn-circle btn-ghost btn-sm"
        >
          <FaEdit size={14} />
        </button>
        <button
          onClick={() => onDelete(project)}
          className="btn btn-circle btn-ghost btn-sm text-error hover:bg-error/10"
        >
          <FaTrash size={14} />
        </button>
      </div>

      <div className="card-body p-5">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`badge ${statusColors[project.estado] || "badge-ghost"} badge-sm uppercase font-extrabold text-[9px]`}
              >
                {project.estado?.replace("_", " ")}
              </span>
              <span className={`badge ${priorityColors[project.prioridad] || "badge-ghost"} badge-outline badge-sm text-[9px] uppercase font-bold italic`}>
                Prioridad {project.prioridad}
              </span>
            </div>
            <h3 className="card-title text-base font-bold group-hover:text-primary transition-colors leading-tight">
              {project.nombre}
            </h3>
          </div>
        </div>

        <p className="text-xs text-base-content/60 line-clamp-2 mt-2 leading-relaxed">
          {project.descripcion}
        </p>

        <div className="divider my-1 opacity-20"></div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="flex items-center gap-2 text-[10px] font-medium opacity-70">
              <FaMoneyBillWave className="text-success" />
              <span>${project.presupuestoTotal?.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-medium opacity-70">
              <FaCalendarAlt className="text-primary" />
              <span className="truncate">{formatDate(project.fechaFinEstimada)}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[10px] font-medium opacity-70 border-t border-base-200/50 pt-2">
            <FaMapMarkerAlt className="text-error opacity-60" />
            <span className="truncate">{project.ubicacionSector}</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[9px] opacity-40 italic">
            <div>Iniciado: {formatDate(project.fechaInicio)}</div>
            <div>Creado: {formatDate(project.fechaCreacion)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
