import { FaUsers, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

const ProjectCard = ({ project }) => {
  const statusColors = {
    "En Ejecución": "badge-warning",
    "Completado": "badge-success",
    "Planificado": "badge-neutral",
    "Detenido": "badge-error",
  };

  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all group">
      <div className="card-body p-5">
        <div className="flex justify-between items-start gap-4">
          <div className="space-y-1 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`badge ${statusColors[project.status] || 'badge-ghost'} badge-sm uppercase font-extrabold text-[9px]`}>
                {project.status}
              </span>
              {project.priority === "Alta" && (
                <span className="badge badge-error badge-outline badge-sm text-[9px] uppercase font-bold italic">Prioridad Alta</span>
              )}
            </div>
            <h3 className="card-title text-base font-bold group-hover:text-primary transition-colors leading-tight">
              {project.title}
            </h3>
          </div>
        </div>

        <p className="text-xs text-base-content/60 line-clamp-2 mt-2 leading-relaxed">
          {project.description}
        </p>

        <div className="divider my-1 opacity-20"></div>

        <div className="space-y-3">
          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-bold uppercase opacity-60">
              <span>Progreso</span>
              <span className="text-primary">{project.progress}%</span>
            </div>
            <progress className="progress progress-primary w-full h-1.5 bg-base-200" value={project.progress} max="100"></progress>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="flex items-center gap-2 text-[10px] font-medium opacity-70">
              <FaUsers className="text-primary" />
              <span>{project.beneficiaries} Benef.</span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-medium opacity-70">
              <FaCalendarAlt className="text-primary" />
              <span>{project.deadline}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-medium opacity-70 border-t border-base-200/50 pt-2">
            <FaMapMarkerAlt className="text-error opacity-60" />
            <span className="truncate">{project.location}</span>
          </div>
        </div>

        <div className="card-actions justify-end mt-4">
          <button className="btn btn-ghost btn-sm btn-block lowercase font-bold transition-all hover:bg-primary/10 hover:text-primary border border-base-200">
            Ver detalles del proyecto
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
