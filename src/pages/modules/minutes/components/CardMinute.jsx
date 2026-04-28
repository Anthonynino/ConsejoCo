import { FaCalendarAlt, FaDownload, FaEye } from "react-icons/fa";

const CardMinute = ({ acta, typeColors }) => {
  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="card-body p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="card-title text-sm font-bold truncate max-w-[260px]">
              {acta.title}
            </h3>

            <div className="mt-1 flex items-center gap-2 text-xs opacity-70 italic font-mono">
              <FaCalendarAlt size={10} className="text-primary" />
              <span>{acta.date}</span>
            </div>
          </div>

          <div className="flex gap-1">
            <button
              className="btn btn-ghost btn-xs btn-square text-primary"
              title="Ver Acta"
            >
              <FaEye />
            </button>
            <button
              className="btn btn-ghost btn-xs btn-square text-success"
              title="Descargar PDF"
            >
              <FaDownload />
            </button>
          </div>
        </div>

        <div className="divider my-1 opacity-20"></div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-3">
            <span
              className={`badge ${typeColors[acta.type]} badge-sm text-[9px] uppercase font-bold tracking-tighter`}
            >
              {acta.type}
            </span>

            <span
              className={`badge ${
                acta.status === "Firmada" ? "badge-success" : "badge-neutral"
              } badge-sm text-[9px] uppercase font-bold`}
            >
              {acta.status}
            </span>
          </div>

          <div className="flex items-center justify-between text-xs font-medium text-base-content/70">
            <span className="opacity-70">Asistencia</span>
            <span className="font-semibold text-base-content">
              {acta.attendance} delegados
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardMinute;
